#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Factory planner helper (read-only).
#
# Reads .factory/tasks/task-graph.yaml and prints:
#   - the DONE set
#   - the READY queue (executable now)
#   - PROMOTABLE backlog tasks (all dependencies done)
#   - the NEXT recommended task with its task file + branch name
#
# It does not modify anything. Promotion (backlog -> ready) and status updates
# remain explicit planner decisions; this tool just surfaces the state.
#
# Usage: ruby scripts/factory/next-task.rb

require "yaml"
require "date"

GRAPH = ".factory/tasks/task-graph.yaml"
MAX_READY = 10 # Planning Engine spec: cap the ready queue.

def load_yaml(path)
  YAML.load_file(path, permitted_classes: [Date, Time], aliases: true)
rescue ArgumentError
  # Older Psych (Ruby < 3.1) rejects the kwargs but loads Date by default.
  YAML.load_file(path)
end

abort "No task graph at #{GRAPH}" unless File.exist?(GRAPH)

data  = load_yaml(GRAPH) || {}
tasks = data["tasks"] || []
status = tasks.each_with_object({}) { |t, h| h[t["id"]] = t["status"] }

done       = tasks.select { |t| t["status"] == "done" }
ready      = tasks.select { |t| t["status"] == "ready" }
backlog    = tasks.select { |t| t["status"] == "backlog" }
promotable = backlog.select do |t|
  Array(t["dependencies"]).all? { |d| status[d] == "done" }
end

def line(t)
  "  - #{t['id']}  [#{t['type']} · risk=#{t['risk']} · #{t['autonomy']}]"
end

puts "DONE (#{done.size}): #{done.map { |t| t['id'] }.join(', ')}"
puts
puts "READY queue (#{ready.size}/#{MAX_READY}):"
ready.each { |t| puts line(t) }
puts "  ::warning:: ready queue exceeds #{MAX_READY}" if ready.size > MAX_READY
puts
puts "PROMOTABLE backlog — dependencies satisfied (#{promotable.size}):"
promotable.each do |t|
  deps = Array(t["dependencies"]).join(", ")
  puts "  - #{t['id']} (deps: #{deps.empty? ? 'none' : deps})"
end
puts

nxt = ready.first || promotable.first
if nxt
  slug = nxt["id"].gsub(".", "-")
  task_file = Dir.glob(".factory/tasks/**/*.yaml")
                 .find { |p| File.read(p).include?("id: #{nxt['id']}") }
  puts "NEXT: #{nxt['id']}#{ready.first ? '' : '  (promote backlog -> ready first)'}"
  puts "  task_file: #{task_file || '(none yet — author one in .factory/tasks/ready/)'}"
  puts "  branch:    factory/task/#{slug}"
else
  puts "NEXT: (nothing ready or promotable)"
end
