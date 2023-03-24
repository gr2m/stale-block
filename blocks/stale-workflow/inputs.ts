// based on https://github.com/actions/stale/blob/1160a2240286f5da8ec72b1c0816ce2481aabf84/action.yml
const INPUTS: Record<
  string,
  {
    type: "string" | "textarea" | "number" | "boolean";
    description: string;
    required: boolean;
    default?: string;
    enum?: string[];
  }
> = {
  "repo-token": {
    description:
      "Token for the repository. Can be passed in using `{{ secrets.GITHUB_TOKEN }}`.",
    required: false,
    default: "${{ github.token }}",
    type: "string",
  },
  "stale-issue-message": {
    description:
      "The message to post on the issue when tagging it. If none provided, will not mark issues stale.",
    required: false,
    type: "textarea",
  },
  "stale-pr-message": {
    description:
      "The message to post on the pull request when tagging it. If none provided, will not mark pull requests stale.",
    required: false,
    type: "textarea",
  },
  "close-issue-message": {
    description:
      "The message to post on the issue when closing it. If none provided, will not comment when closing an issue.",
    required: false,
    type: "textarea",
  },
  "close-pr-message": {
    description:
      "The message to post on the pull request when closing it. If none provided, will not comment when closing a pull requests.",
    required: false,
    type: "textarea",
  },
  "days-before-stale": {
    description:
      "The number of days old an issue or a pull request can be before marking it stale. Set to -1 to never mark issues or pull requests as stale automatically.",
    required: false,
    default: "60",
    type: "number",
  },
  "days-before-issue-stale": {
    description:
      'The number of days old an issue can be before marking it stale. Set to -1 to never mark issues as stale automatically. Override "days-before-stale" option regarding only the issues.',
    required: false,
    type: "number",
  },
  "days-before-pr-stale": {
    description:
      'The number of days old a pull request can be before marking it stale. Set to -1 to never mark pull requests as stale automatically. Override "days-before-stale" option regarding only the pull requests.',
    required: false,
    type: "number",
  },
  "days-before-close": {
    description:
      "The number of days to wait to close an issue or a pull request after it being marked stale. Set to -1 to never close stale issues or pull requests.",
    required: false,
    default: "7",
    type: "number",
  },
  "days-before-issue-close": {
    description:
      'The number of days to wait to close an issue after it being marked stale. Set to -1 to never close stale issues. Override "days-before-close" option regarding only the issues.',
    required: false,
    type: "number",
  },
  "days-before-pr-close": {
    description:
      'The number of days to wait to close a pull request after it being marked stale. Set to -1 to never close stale pull requests. Override "days-before-close" option regarding only the pull requests.',
    required: false,
    type: "number",
  },
  "stale-issue-label": {
    description: "The label to apply when an issue is stale.",
    required: false,
    default: "Stale",
    type: "string",
  },
  "close-issue-label": {
    description: "The label to apply when an issue is closed.",
    required: false,
    type: "string",
  },
  "exempt-issue-labels": {
    description:
      'The labels that mean an issue is exempt from being marked stale. Separate multiple labels with commas (eg. "label1,label2").',
    default: "",
    required: false,
    type: "string",
  },
  "close-issue-reason": {
    description: "The reason to use when closing an issue.",
    default: "not_planned",
    required: false,
    type: "string",
    enum: ["not_planned", "completed"],
  },
  "stale-pr-label": {
    description: "The label to apply when a pull request is stale.",
    default: "Stale",
    required: false,
    type: "string",
  },
  "close-pr-label": {
    description: "The label to apply when a pull request is closed.",
    required: false,
    type: "string",
  },
  "exempt-pr-labels": {
    description:
      'The labels that mean a pull request is exempt from being marked as stale. Separate multiple labels with commas (eg. "label1,label2").',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-milestones": {
    description:
      'The milestones that mean an issue or a pull request is exempt from being marked as stale. Separate multiple milestones with commas (eg. "milestone1,milestone2").',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-issue-milestones": {
    description:
      'The milestones that mean an issue is exempt from being marked as stale. Separate multiple milestones with commas (eg. "milestone1,milestone2"). Override "exempt-milestones" option regarding only the issues.',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-pr-milestones": {
    description:
      'The milestones that mean a pull request is exempt from being marked as stale. Separate multiple milestones with commas (eg. "milestone1,milestone2"). Override "exempt-milestones" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-all-milestones": {
    description:
      "Exempt all issues and pull requests with milestones from being marked as stale. Default to false.",
    default: "false",
    required: false,
    type: "string",
  },
  "exempt-all-issue-milestones": {
    description:
      'Exempt all issues with milestones from being marked as stale. Override "exempt-all-milestones" option regarding only the issues.',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-all-pr-milestones": {
    description:
      'Exempt all pull requests with milestones from being marked as stale. Override "exempt-all-milestones" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "string",
  },
  "only-labels": {
    description:
      "Only issues or pull requests with all of these labels are checked if stale. Defaults to `` (disabled) and can be a comma-separated list of labels.",
    default: "",
    required: false,
    type: "string",
  },
  "any-of-labels": {
    description:
      "Only issues or pull requests with at least one of these labels are checked if stale. Defaults to `` (disabled) and can be a comma-separated list of labels.",
    default: "",
    required: false,
    type: "string",
  },
  "any-of-issue-labels": {
    description:
      'Only issues with at least one of these labels are checked if stale. Defaults to `` (disabled) and can be a comma-separated list of labels. Override "any-of-labels" option regarding only the issues.',
    default: "",
    required: false,
    type: "string",
  },
  "any-of-pr-labels": {
    description:
      'Only pull requests with at least one of these labels are checked if stale. Defaults to `` (disabled) and can be a comma-separated list of labels. Override "any-of-labels" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "string",
  },
  "only-issue-labels": {
    description:
      'Only issues with all of these labels are checked if stale. Defaults to `[]` (disabled) and can be a comma-separated list of labels. Override "only-labels" option regarding only the issues.',
    default: "",
    required: false,
    type: "string",
  },
  "only-pr-labels": {
    description:
      'Only pull requests with all of these labels are checked if stale. Defaults to `[]` (disabled) and can be a comma-separated list of labels. Override "only-labels" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "string",
  },
  "operations-per-run": {
    description:
      "The maximum number of operations per run, used to control rate limiting (GitHub API CRUD related).",
    default: "30",
    required: false,
    type: "number",
  },
  "remove-stale-when-updated": {
    description:
      "Remove stale labels from issues and pull requests when they are updated or commented on.",
    default: "true",
    required: false,
    type: "boolean",
  },
  "remove-issue-stale-when-updated": {
    description:
      'Remove stale labels from issues when they are updated or commented on. Override "remove-stale-when-updated" option regarding only the issues.',
    default: "",
    required: false,
    type: "boolean",
  },
  "remove-pr-stale-when-updated": {
    description:
      'Remove stale labels from pull requests when they are updated or commented on. Override "remove-stale-when-updated" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "boolean",
  },
  "debug-only": {
    description:
      "Run the processor in debug mode without actually performing any operations on live issues.",
    default: "false",
    required: false,
    type: "boolean",
  },
  ascending: {
    description:
      "The order to get issues or pull requests. Defaults to false, which is descending.",
    default: "false",
    required: false,
    type: "boolean",
  },
  "delete-branch": {
    description: "Delete the git branch after closing a stale pull request.",
    default: "false",
    required: false,
    type: "boolean",
  },
  "start-date": {
    description:
      "The date used to skip the stale action on issue/pull request created before it (ISO 8601 or RFC 2822).",
    default: "",
    required: false,
    type: "string",
  },
  "exempt-assignees": {
    description:
      'The assignees which exempt an issue or a pull request from being marked as stale. Separate multiple assignees with commas (eg. "user1,user2").',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-issue-assignees": {
    description:
      'The assignees which exempt an issue from being marked as stale. Separate multiple assignees with commas (eg. "user1,user2"). Override "exempt-assignees" option regarding only the issues.',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-pr-assignees": {
    description:
      'The assignees which exempt a pull request from being marked as stale. Separate multiple assignees with commas (eg. "user1,user2"). Override "exempt-assignees" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "string",
  },
  "exempt-all-assignees": {
    description:
      "Exempt all issues and pull requests with assignees from being marked as stale. Default to false.",
    default: "false",
    required: false,
    type: "boolean",
  },
  "exempt-all-issue-assignees": {
    description:
      'Exempt all issues with assignees from being marked as stale. Override "exempt-all-assignees" option regarding only the issues.',
    default: "",
    required: false,
    type: "boolean",
  },
  "exempt-all-pr-assignees": {
    description:
      'Exempt all pull requests with assignees from being marked as stale. Override "exempt-all-assignees" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "boolean",
  },
  "exempt-draft-pr": {
    description:
      "Exempt draft pull requests from being marked as stale. Default to false.",
    default: "false",
    required: false,
    type: "boolean",
  },
  "enable-statistics": {
    description:
      "Display some statistics at the end regarding the stale workflow (only when the logs are enabled).",
    default: "true",
    required: false,
    type: "boolean",
  },
  "labels-to-add-when-unstale": {
    description:
      "A comma delimited list of labels to add when an issue or pull request becomes unstale.",
    default: "",
    required: false,
    type: "string",
  },
  "labels-to-remove-when-stale": {
    description:
      "A comma delimited list of labels to remove when an issue or pull request becomes stale.",
    default: "",
    required: false,
    type: "string",
  },
  "labels-to-remove-when-unstale": {
    description:
      "A comma delimited list of labels to remove when an issue or pull request becomes unstale.",
    default: "",
    required: false,
    type: "string",
  },
  "ignore-updates": {
    description:
      "Any update (update/comment) can reset the stale idle time on the issues and pull requests.",
    default: "false",
    required: false,
    type: "boolean",
  },
  "ignore-issue-updates": {
    description:
      'Any update (update/comment) can reset the stale idle time on the issues. Override "ignore-updates" option regarding only the issues.',
    default: "",
    required: false,
    type: "boolean",
  },
  "ignore-pr-updates": {
    description:
      'Any update (update/comment) can reset the stale idle time on the pull requests. Override "ignore-updates" option regarding only the pull requests.',
    default: "",
    required: false,
    type: "boolean",
  },
  "include-only-assigned": {
    description:
      "Only the issues or the pull requests with an assignee will be marked as stale automatically.",
    default: "false",
    required: false,
    type: "boolean",
  },
};

export default INPUTS;
