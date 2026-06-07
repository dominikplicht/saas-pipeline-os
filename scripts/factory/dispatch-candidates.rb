#!/usr/bin/env ruby
# frozen_string_literal: true
#
# Read-only graph emitter for the autonomous dispatcher.
#
# Prints one line per task: "<id>\t<status>\t<dep1,dep2,...>".
# The dispatcher workflow combines this with merged/open PR data (via gh) to
# pick the next dispatchable ready task. Done-detection lives in the workflow.
#
# Usage: ruby scripts/factory/dispatch-candidates.rb

require "yaml"
require "date"

GRAPH = ".factory/tasks/task-graph.yaml"

def load_yaml(path)
  YAML.load_file(path, permitted_classes: [Date, Time], aliases: true)
rescue ArgumentError
  YAML.load_file(path) # older Psych: no kwargs, allows Date by default
end

exit 0 unless File.exist?(GRAPH)

data  = load_yaml(GRAPH) || {}
tasks = data["tasks"] || []

tasks.each do |t|
  id = t["id"].to_s
  next if id.empty?
  status = t["status"].to_s
  deps = Array(t["dependencies"]).map(&:to_s).reject(&:empty?).join(",")
  puts "#{id}\t#{status}\t#{deps}"
end
