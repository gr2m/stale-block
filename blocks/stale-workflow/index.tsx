import { useState } from "react";

import { FileBlockProps, getLanguageFromFilename } from "@githubnext/blocks";
import {
  Box,
  FormControl,
  Heading,
  Link,
  Textarea,
  TextInput,
} from "@primer/react";
import yaml from "js-yaml";
import { Cron } from "react-js-cron";
import "react-js-cron/dist/styles.css";

// import INPUTS from "./inputs";

export default function ExampleFileBlock(props: FileBlockProps) {
  const { content, onUpdateContent } = props;

  const data = yaml.load(content);

  const name = data.name;
  const [{ cron }] = data.on.schedule;

  const [cronValue, cronSetValue] = useState("30 5 * * 1,6");
  const [workflowSource, setWorkflowSource] = useState({});
  const [error, setError] = useState(null);

  const [
    [
      jobKey,
      {
        steps: [{ uses: version, with: parameters }, extraStep],
      },
    ],
    extraJob,
  ] = Object.entries(data.jobs);

  if (extraJob || extraStep) {
    setError("Only one job with one step is currently supported.");
  }

  if (version !== "actions/stale@v7") {
    setError("Only actions/stale@v7 is currently supported.");
  }

  return (
    <Box p={4}>
      <Heading>{name}</Heading>

      <FormControl>
        <h3>Schedule</h3>
        <Cron value={cronValue} setValue={cronSetValue} />
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <Heading as="h4" sx={{ fontSize: 2 }}>
            Days before stale
          </Heading>
        </FormControl.Label>
        <TextInput
          aria-label="Days before stale"
          name="days-before-stale"
          type="number"
          defaultValue={60}
          min={-1}
        />
        <FormControl.Caption>
          The number of days old an issue or a pull request can be before
          marking it stale. Set to -1 to never mark issues or pull requests as
          stale automatically. The setting can be customized{" "}
          <Link href="#tbd">for issues</Link> or{" "}
          <Link href="#tbd">for pull requests</Link>.
        </FormControl.Caption>
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <Heading as="h4" sx={{ fontSize: 2 }}>
            Days before close
          </Heading>
        </FormControl.Label>
        <TextInput
          aria-label="Days before close"
          name="days-before-close"
          type="number"
          defaultValue={7}
          min={-1}
        />
        <FormControl.Caption>
          The number of days old an issue or a pull request can be before
          marking it close. Set to -1 to never mark issues or pull requests as
          close automatically. The setting can be customized{" "}
          <Link href="#tbd">for issues</Link> or{" "}
          <Link href="#tbd">for pull requests</Link>.
        </FormControl.Caption>
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <Heading as="h4" sx={{ fontSize: 2 }}>
            Stale Issue Message
          </Heading>
        </FormControl.Label>
        <Textarea
          aria-label="Stale Issue Message"
          name="stale-issue-message"
          placeholder="e.g. This issue is stale"
          block
          rows={2}
          resize="vertical"
        />
        <FormControl.Caption>
          The message to post on the issue when tagging it. If none provided,
          will not mark issues stale.
        </FormControl.Caption>
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <Heading as="h4" sx={{ fontSize: 2 }}>
            Stale Pull Request Message
          </Heading>
        </FormControl.Label>
        <Textarea
          aria-label="Stale Pull Request Message"
          name="stale-pr-message"
          placeholder="e.g. This pull request is stale"
          block
          rows={2}
          resize="vertical"
        />
        <FormControl.Caption>
          The message to post on the pull request when tagging it. If none
          provided, will not mark pull requests stale.
        </FormControl.Caption>
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <Heading as="h4" sx={{ fontSize: 2 }}>
            Close Issue Message
          </Heading>
        </FormControl.Label>
        <Textarea
          aria-label="Close Issue Message"
          name="close-issue-message"
          placeholder="e.g. This issue is close"
          block
          rows={2}
          resize="vertical"
        />
        <FormControl.Caption>
          The message to post on the issue when closing it. If none provided,
          will not comment when closing an issue.
        </FormControl.Caption>
      </FormControl>

      <FormControl>
        <FormControl.Label>
          <Heading as="h4" sx={{ fontSize: 2 }}>
            Close Pull Request Message
          </Heading>
        </FormControl.Label>
        <Textarea
          aria-label="Close Pull Request Message"
          name="close-pr-message"
          placeholder="e.g. This pull request is close"
          block
          rows={2}
          resize="vertical"
        />
        <FormControl.Caption>
          The message to post on the pull request when closing it. If none
          provided, will not comment when closing a pull requests.
        </FormControl.Caption>
      </FormControl>

      <h3>Advanced Settings</h3>

      <p>
        <em>to be done...</em>
      </p>
    </Box>
  );
}
