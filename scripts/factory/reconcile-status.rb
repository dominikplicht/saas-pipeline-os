#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Reconcile task-graph statuses with reality: mark a task `done` once its branch
# (factory/task/<slug>) has a merged PR. Keeps the graph honest for the planner /
# next-task.rb (the dispatcher itself derives done from merged PRs and does not
# depend on this).
#
# Edits status lines in place (line-based) to preserve formatting/comments —
# does NOT re-dump YAML.
#
# Usage: pass done slugs (one per line) on stdin:
#   gh pr list --state merged --base main --json headRefName \
#     --jq '.[].headRefName' | sed -n 's#^factory/task/##p' \
#     | ruby scripts/factory/reconcile-status.rb
#
# Prints the ids it transitioned to done (empty output = no change).

require "set"

GRAPH = ".factory/tasks/task-graph.yaml"
exit 0 unless File.exist?(GRAPH)

done_slugs = STDIN.read.split("\n").map(&:strip).reject(&:empty?).to_set

lines = File.readlines(GRAPH)
cur_id = nil
changed = []

out = lines.map do |line|
  if (m = line.match(/^\s*-\s*id:\s*(\S+)\s*$/))
    cur_id = m[1]
  end
  if cur_id && (m = line.match(/^(\s*)status:\s*(\S+)\s*$/))
    indent, status = m[1], m[2]
    slug = cur_id.gsub(".", "-")
    if done_slugs.include?(slug) && status != "done"
      changed << cur_id
      line = "#{indent}status: done\n"
    end
  end
  line
end

if changed.empty?
  # no change
else
  File.write(GRAPH, out.join)
  changed.each { |id| puts id }
end
