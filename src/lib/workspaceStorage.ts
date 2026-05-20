import {
  approvalOrder,
  decisionLabels,
  placeholderLabels,
  questionLabels,
  sampleWorkspace,
  type ApprovalState,
  type ClientQuestion,
  type ClientRequest,
  type ClientWorkspace,
  type CloseoutChecklistItem,
  type DecisionLogEntry,
  type FilePlaceholder,
  type MilestoneTemplate,
  type PlaceholderStatus,
  type PortalTheme
} from "../data/clientWorkspace.js";

export const WORKSPACE_STORAGE_KEY = "foxhen-client-portal-lite.workspace.v1";

export type StorageLike = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

export type CustomMilestoneInput = {
  title: string;
  owner?: string;
  dueWindow?: string;
  summary?: string;
  now?: Date;
};

export type WorkspaceParseResult =
  | { ok: true; workspace: ClientWorkspace }
  | { ok: false; error: string };

export function cloneSampleWorkspace(): ClientWorkspace {
  return cloneWorkspace(sampleWorkspace);
}

export function serializeWorkspace(workspace: ClientWorkspace) {
  return JSON.stringify(workspace, null, 2);
}

export function parseWorkspaceJson(contents: string): WorkspaceParseResult {
  try {
    const parsed = JSON.parse(contents) as unknown;

    if (!isClientWorkspace(parsed)) {
      return { ok: false, error: "Import must be a Client Portal Lite workspace JSON export." };
    }

    return { ok: true, workspace: cloneWorkspace(parsed) };
  } catch {
    return { ok: false, error: "Import must be valid JSON." };
  }
}

export function loadWorkspaceFromStorage(storage: StorageLike | undefined | null): ClientWorkspace | null {
  if (!storage) return null;

  const storedWorkspace = storage.getItem(WORKSPACE_STORAGE_KEY);
  if (!storedWorkspace) return null;

  const parsedWorkspace = parseWorkspaceJson(storedWorkspace);
  if (!parsedWorkspace.ok) {
    storage.removeItem(WORKSPACE_STORAGE_KEY);
    return null;
  }

  return parsedWorkspace.workspace;
}

export function saveWorkspaceToStorage(workspace: ClientWorkspace, storage: StorageLike | undefined | null) {
  if (!storage) return;
  storage.setItem(WORKSPACE_STORAGE_KEY, serializeWorkspace(workspace));
}

export function addCustomMilestone(workspace: ClientWorkspace, input: CustomMilestoneInput): ClientWorkspace {
  const baseId = createLocalId("custom-milestone", input.now ?? new Date());
  const existingIds = new Set(workspace.milestones.map((milestone) => milestone.id));
  const id = makeUniqueId(baseId, existingIds);
  const title = normalizeText(input.title, "Custom milestone");
  const owner = normalizeText(input.owner, "Shared");
  const dueWindow = normalizeText(input.dueWindow, "Upcoming");
  const summary = normalizeText(
    input.summary,
    "Locally added public-safe milestone. Add private details only in a private fork."
  );

  const milestone: MilestoneTemplate = {
    id,
    title,
    phase: "Custom",
    owner,
    dueWindow,
    approvalState: "not-started",
    progress: 0,
    summary,
    acceptanceCriteria: [
      "Scope is public-safe and ready to review.",
      "Owner and due window are confirmed.",
      "Next action is captured before private details are added."
    ],
    files: [],
    requests: [],
    questions: []
  };

  return {
    ...workspace,
    milestones: [...workspace.milestones, milestone]
  };
}

function createLocalId(prefix: string, now: Date) {
  const timestamp = now.toISOString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${prefix}-${timestamp}`;
}

function makeUniqueId(baseId: string, existingIds: Set<string>) {
  if (!existingIds.has(baseId)) return baseId;

  let suffix = 2;
  while (existingIds.has(`${baseId}-${suffix}`)) {
    suffix += 1;
  }

  return `${baseId}-${suffix}`;
}

function normalizeText(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  return trimmed || fallback;
}

function cloneWorkspace<T>(workspace: T): T {
  return JSON.parse(JSON.stringify(workspace)) as T;
}

function isClientWorkspace(value: unknown): value is ClientWorkspace {
  if (!isRecord(value)) return false;

  return (
    isString(value.repoName) &&
    isString(value.title) &&
    isString(value.clientLabel) &&
    isString(value.workspaceLabel) &&
    isString(value.serviceLine) &&
    isString(value.summary) &&
    isString(value.repositoryUrl) &&
    isString(value.liveDemoUrl) &&
    isPortalTheme(value.theme) &&
    isNonEmptyArrayOf(value.milestones, isMilestoneTemplate) &&
    isArrayOf(value.decisions, isDecisionLogEntry) &&
    isArrayOf(value.closeoutChecklist, isCloseoutChecklistItem) &&
    isArrayOf(value.publicSafeRules, isString)
  );
}

function isPortalTheme(value: unknown): value is PortalTheme {
  return (
    isRecord(value) &&
    isString(value.accent) &&
    isString(value.accent2) &&
    isString(value.ink) &&
    isString(value.soft) &&
    isString(value.warm)
  );
}

function isMilestoneTemplate(value: unknown): value is MilestoneTemplate {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.title) &&
    isString(value.phase) &&
    isString(value.owner) &&
    isString(value.dueWindow) &&
    isApprovalState(value.approvalState) &&
    isNumber(value.progress) &&
    isString(value.summary) &&
    isArrayOf(value.acceptanceCriteria, isString) &&
    isArrayOf(value.files, isFilePlaceholder) &&
    isArrayOf(value.requests, isClientRequest) &&
    isArrayOf(value.questions, isClientQuestion)
  );
}

function isFilePlaceholder(value: unknown): value is FilePlaceholder {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.label) &&
    isString(value.kind) &&
    isPlaceholderStatus(value.status) &&
    isString(value.notes)
  );
}

function isClientRequest(value: unknown): value is ClientRequest {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.label) &&
    isString(value.kind) &&
    isPlaceholderStatus(value.status) &&
    isString(value.notes)
  );
}

function isClientQuestion(value: unknown): value is ClientQuestion {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.question) &&
    isString(value.owner) &&
    isQuestionStatus(value.status) &&
    isString(value.answer)
  );
}

function isDecisionLogEntry(value: unknown): value is DecisionLogEntry {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.date) &&
    isString(value.topic) &&
    isString(value.owner) &&
    isDecisionStatus(value.status) &&
    isString(value.decision) &&
    isString(value.nextStep)
  );
}

function isCloseoutChecklistItem(value: unknown): value is CloseoutChecklistItem {
  return (
    isRecord(value) &&
    isString(value.id) &&
    isString(value.label) &&
    isString(value.owner) &&
    isBoolean(value.complete)
  );
}

function isApprovalState(value: unknown): value is ApprovalState {
  return isString(value) && approvalOrder.includes(value as ApprovalState);
}

function isPlaceholderStatus(value: unknown): value is PlaceholderStatus {
  return isRecordKey(value, placeholderLabels);
}

function isQuestionStatus(value: unknown) {
  return isRecordKey(value, questionLabels);
}

function isDecisionStatus(value: unknown) {
  return isRecordKey(value, decisionLabels);
}

function isRecordKey<T extends string>(value: unknown, record: Record<T, string>): value is T {
  return isString(value) && Object.prototype.hasOwnProperty.call(record, value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

function isNonEmptyArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return isArrayOf(value, guard) && value.length > 0;
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}
