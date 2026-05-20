import {
  WORKSPACE_STORAGE_KEY,
  addCustomMilestone,
  cloneSampleWorkspace,
  loadWorkspaceFromStorage,
  parseWorkspaceJson,
  saveWorkspaceToStorage,
  serializeWorkspace,
  type StorageLike
} from "../src/lib/workspaceStorage.js";

function assertEqual<T>(actual: T, expected: T, label: string) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${String(expected)}, received ${String(actual)}`);
  }
}

function assert(condition: boolean, label: string) {
  if (!condition) {
    throw new Error(label);
  }
}

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

const storage = new MemoryStorage();
const workspace = cloneSampleWorkspace();
const customizedWorkspace = addCustomMilestone(workspace, {
  title: "Custom client review",
  owner: "Client",
  dueWindow: "Next check-in",
  summary: "Review a public-safe client workspace update before the next milestone.",
  now: new Date("2026-05-20T16:00:00.000Z")
});

assertEqual(customizedWorkspace.milestones.length, workspace.milestones.length + 1, "custom milestone count");
assertEqual(customizedWorkspace.milestones.at(-1)?.id, "custom-milestone-2026-05-20t16-00-00-000z", "custom milestone id");
assertEqual(customizedWorkspace.milestones.at(-1)?.approvalState, "not-started", "custom milestone approval");
assertEqual(workspace.milestones.length, cloneSampleWorkspace().milestones.length, "sample workspace remains unchanged");

saveWorkspaceToStorage(customizedWorkspace, storage);

assert(storage.getItem(WORKSPACE_STORAGE_KEY)?.includes("Custom client review") === true, "stored workspace includes custom milestone");

const restoredWorkspace = loadWorkspaceFromStorage(storage);

assertEqual(restoredWorkspace?.milestones.at(-1)?.title, "Custom client review", "restored custom milestone title");
assertEqual(restoredWorkspace?.milestones.at(-1)?.owner, "Client", "restored custom milestone owner");

const serializedWorkspace = serializeWorkspace(customizedWorkspace);
const parsedWorkspace = parseWorkspaceJson(serializedWorkspace);

assertEqual(parsedWorkspace.ok, true, "serialized workspace parses");
if (parsedWorkspace.ok) {
  assertEqual(parsedWorkspace.workspace.milestones.at(-1)?.title, "Custom client review", "parsed custom milestone title");
}

const malformedWorkspace = parseWorkspaceJson("{not json");

assertEqual(malformedWorkspace.ok, false, "malformed workspace rejected");
