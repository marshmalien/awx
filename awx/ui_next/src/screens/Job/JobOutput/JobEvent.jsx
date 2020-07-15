import Ansi from 'ansi-to-html';
import hasAnsi from 'has-ansi';
import { AngleDownIcon, AngleRightIcon } from '@patternfly/react-icons';
import { AllHtmlEntities } from 'html-entities';
import React, { useState } from 'react';
import {
  JobEventLine,
  JobEventLineToggle,
  JobEventLineNumber,
  JobEventLineText,
} from './shared';

const EVENT_START_TASK = 'playbook_on_task_start';
const EVENT_START_PLAY = 'playbook_on_play_start';
const EVENT_STATS_PLAY = 'playbook_on_stats';
const TIME_EVENTS = [EVENT_START_TASK, EVENT_START_PLAY, EVENT_STATS_PLAY];
const EVENT_GROUPS = [EVENT_START_TASK, EVENT_START_PLAY];
const ansi = new Ansi({
  stream: true,
  colors: {
    0: '#000',
    1: '#A30000',
    2: '#486B00',
    3: '#795600',
    4: '#00A',
    5: '#A0A',
    6: '#004368',
    7: '#AAA',
    8: '#555',
    9: '#F55',
    10: '#5F5',
    11: '#FF5',
    12: '#55F',
    13: '#F5F',
    14: '#5FF',
    15: '#FFF',
  },
});
const entities = new AllHtmlEntities();

function getTimestamp({ created }) {
  const date = new Date(created);

  const dateHours = date.getHours();
  const dateMinutes = date.getMinutes();
  const dateSeconds = date.getSeconds();

  const stampHours = dateHours < 10 ? `0${dateHours}` : dateHours;
  const stampMinutes = dateMinutes < 10 ? `0${dateMinutes}` : dateMinutes;
  const stampSeconds = dateSeconds < 10 ? `0${dateSeconds}` : dateSeconds;

  return `${stampHours}:${stampMinutes}:${stampSeconds}`;
}

function getLineTextHtml({ created, event, start_line, stdout }) {
  const sanitized = entities.encode(stdout);
  return sanitized.split('\r\n').map((lineText, index) => {
    let html;
    if (hasAnsi(lineText)) {
      html = ansi.toHtml(lineText);
    } else {
      html = lineText;
    }

    if (index === 1 && TIME_EVENTS.includes(event)) {
      const time = getTimestamp({ created });
      html += `<span class="time">${time}</span>`;
    }
    return {
      lineNumber: start_line + index,
      html,
      index,
    };
  });
}

function JobEvent({
  counter,
  created,
  event,
  isClickable,
  onJobEventClick,
  stdout,
  start_line,
  style,
  type,
  uuid,
  canToggle,
  toggleEvent,
  isVisibleParent,
  isJobExpanded
}) {
  return !stdout ? null : (
    <div style={style} type={type}>
      {getLineTextHtml({ created, event, start_line, stdout }).map(
        ({ lineNumber, html, index }) =>
          lineNumber >= 0 && (
            <JobEventLine
              onClick={isClickable ? onJobEventClick : undefined}
              key={`${counter}-${lineNumber}`}
              isFirst={lineNumber === 0}
              isClickable={isClickable}
            >
              <JobEventLineToggle>
                {canToggle(index) && isVisibleParent && (
                  <AngleDownIcon
                    onClick={() => {
                      toggleEvent(false, uuid);
                    }}
                  />
                )}
                {canToggle(index) && !isVisibleParent && (
                  <AngleRightIcon
                    onClick={() => {
                      toggleEvent(true, uuid);
                    }}
                  />
                )}
              </JobEventLineToggle>
              <JobEventLineNumber>{lineNumber}</JobEventLineNumber>
              <JobEventLineText
                type="job_event_line_text"
                dangerouslySetInnerHTML={{
                  __html: html,
                }}
              />
            </JobEventLine>
          )
      )}
    </div>
  );
}

export default JobEvent;
