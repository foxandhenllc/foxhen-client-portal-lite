import { buildClientWorkspaceReport, serializeClientWorkspaceStatus } from "../src/exporters/statusReport.js";
import { fixtureWorkspace } from "./fixtures/clientWorkspace.fixture.js";

function assertEqual<T>(actual: T, expected: T, label: string) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${String(expected)}, received ${String(actual)}`);
  }
}

function assertIncludes(value: string, expected: string, label: string) {
  if (!value.includes(expected)) {
    throw new Error(`${label}: expected output to include ${expected}`);
  }
}

function assertMatch(value: string, pattern: RegExp, label: string) {
  if (!pattern.test(value)) {
    throw new Error(`${label}: expected output to match ${pattern}`);
  }
}

function assertDoesNotMatch(value: string, pattern: RegExp, label: string) {
  if (pattern.test(value)) {
    throw new Error(`${label}: output unexpectedly matched ${pattern}`);
  }
}

const report = buildClientWorkspaceReport(fixtureWorkspace, {
  generatedAt: "2026-05-20T12:00:00.000Z",
  publicSafeMode: true
});

assertEqual(report.json.generatedAt, "2026-05-20T12:00:00.000Z", "generatedAt");
assertEqual(report.json.publicSafeMode, true, "publicSafeMode");
assertEqual(report.json.summary.totalMilestones, 2, "totalMilestones");
assertEqual(report.json.summary.openClientQuestions, 1, "openClientQuestions");
assertEqual(report.json.summary.pendingFileRequests, 2, "pendingFileRequests");
assertEqual(report.json.summary.closeoutCompletion, "1/3", "closeoutCompletion");
assertMatch(report.markdown, /^# Fictional Client Portal Status/m, "markdown title");
assertMatch(report.markdown, /## Milestones/, "milestone section");
assertMatch(report.markdown, /Launch workspace shell — In review — 65%/, "milestone row");
assertMatch(report.markdown, /## Decisions/, "decisions section");
assertMatch(report.markdown, /Use placeholder files only/, "decision text");
assertDoesNotMatch(report.markdown, /secret|token|password|api key/i, "sensitive wording");

const serialized = serializeClientWorkspaceStatus(report.json);

assertIncludes(serialized, '"publicSafeMode": true', "serialized public mode");
assertIncludes(serialized, '"pendingFileRequests": 2', "serialized pending requests");
