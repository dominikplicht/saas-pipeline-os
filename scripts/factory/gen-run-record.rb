#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Deterministic run-record generator for the headless worker.
#
# Reads the task contract, the ACTUAL staged diff, and the validation results
# (passed via env), and writes .factory/runs/<date>-<slug>/run.md. Because the
# diff drives the file list, the run record always matches the PR diff — which
# is exactly what factory-pr-audit.yml's run-record-mentions check requires.
#
# Usage:
#   git add -A
#   RESULT_TYPECHECK=pass RESULT_LINT=pass RESULT_TEST=pass RESULT_BUILD=pass \
#     ruby scripts/factory/gen-run-record.rb <task_id>
#   git add -A   # to include the generated run record
#
# Prints the run-record path on stdout.

require "yaml"
require "date"
require "fileutils"

task_id = ARGV[0]
abort "usage: gen-run-record.rb <task_id>" if task_id.nil? || task_id.empty?

def load_yaml(path)
  YAML.load_file(path, permitted_classes: [Date, Time], aliases: true)
rescue ArgumentError
  YAML.load_file(path) # older Psych: no kwargs, allows Date by default
end

# Resolve the task contract by id (same approach as the audit).
task_file = Dir.glob(".factory/tasks/**/*.yaml")
               .find { |p| File.read(p).include?("id: #{task_id}") }
abort "No task file found for id: #{task_id}" unless task_file

c = load_yaml(task_file) || {}
title    = c["title"] || task_id
autonomy = c.dig("autonomy", "level") || ""
gate     = c.dig("autonomy", "human_gate_required").to_s
risk     = c.dig("risk", "level") || ""

slug   = task_id.gsub(".", "-")
branch = "factory/task/#{slug}"
date   = Time.now.strftime("%Y-%m-%d")
dir    = ".factory/runs/#{date}-#{slug}"
out    = "#{dir}/run.md"

# Actual changes: staged vs HEAD (branch has no commit yet → HEAD == base).
diff = `git diff --cached --name-only`.split("\n").map(&:strip).reject(&:empty?)
# The run record references itself (it is committed alongside the diff).
diff = (diff + [out]).uniq.sort

checks = {
  "typecheck" => ENV["RESULT_TYPECHECK"] || "not-run",
  "lint"      => ENV["RESULT_LINT"]      || "not-run",
  "test"      => ENV["RESULT_TEST"]      || "not-run",
  "build"     => ENV["RESULT_BUILD"]     || "not-run",
}
all_pass = checks.values.all? { |v| v == "pass" }
worker   = ENV["WORKER_NAME"] || "Claude Code (headless · factory-worker.yml)"

FileUtils.mkdir_p(dir)

File.open(out, "w") do |f|
  f.puts "# Run Record — #{task_id}"
  f.puts
  f.puts "## Run Metadata"
  f.puts
  f.puts "| Field | Value |"
  f.puts "|---|---|"
  f.puts "| task_id | #{task_id} |"
  f.puts "| task_file | #{task_file} |"
  f.puts "| branch | #{branch} |"
  f.puts "| base_branch | main |"
  f.puts "| run_date | #{date} |"
  f.puts "| worker | #{worker} |"
  f.puts "| autonomy_level | #{autonomy} |"
  f.puts "| status | #{all_pass ? 'completed' : 'failed — see validation'} |"
  f.puts
  f.puts "## Task"
  f.puts
  f.puts title
  f.puts
  f.puts "## Actual PR Diff"
  f.puts
  f.puts "Generated from `git diff --cached --name-only` (plus this run record):"
  f.puts
  f.puts "| File |"
  f.puts "|---|"
  diff.each { |p| f.puts "| `#{p}` |" }
  f.puts
  f.puts "## Validation Results"
  f.puts
  f.puts "| Check | Result |"
  f.puts "|---|---|"
  checks.each { |k, v| f.puts "| #{k} | #{v} |" }
  f.puts
  f.puts "## Auto-Merge Eligibility"
  f.puts
  f.puts "- autonomy.level = #{autonomy}"
  f.puts "- human_gate_required = #{gate}"
  f.puts "- risk = #{risk}"
  f.puts
  f.puts "Eligibility is re-derived by `factory-auto-merge.yml` (A3 ∧ !human_gate ∧ risk≠high ∧ both checks green)."
end

puts out
