/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies.
 */
import React, { useState } from 'react';

/**
 * Internal dependencies.
 */
import type { PSInfo as PSInfoType } from '../../../../utils/fetchPSInfo';
import RenderLink from './renderLink';
import { ArrowRight, Button } from '@ps-analysis-tool/design-system';
import classNames from 'classnames';

/**
 * @type {Array} LABELS - Array of objects containing the label and link label for each dropdown item.
 * @property {string} label - The label for the dropdown item.
 * @property {string} linkLabel - The label for the link.
 */
const LABELS = [
  {
    label: 'Proposal',
    linkLabel: 'Public explanation for the proposed solution (Chrome)',
  },
  {
    label: 'Public Discussion',
    linkLabel: 'Public questions and feedback about the proposal',
  },
  {
    label: 'Video Overview',
    linkLabel: 'Short summary video',
  },
  {
    label: 'Dev Documentation',
    linkLabel: 'Developer documentation',
  },
];

interface LearnMoreDropdownProps {
  PSInfo: PSInfoType;
  hasSeparator?: boolean;
}

const LearnMoreDropdown = ({
  PSInfo: { proposal, publicDiscussion, videoOverview, devDocumentation },
  hasSeparator,
}: LearnMoreDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="flow-root border-t border-gray-200 dark:border-gray-500">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-500"
          >
            {[proposal, publicDiscussion, videoOverview, devDocumentation].map(
              (value, index) => (
                <RenderLink
                  key={index}
                  link={value}
                  label={LABELS[index].label}
                  linkLabel={LABELS[index].linkLabel}
                />
              )
            )}
          </ul>
        </div>
      )}
      <div
        className={classNames(
          'pt-4',
          hasSeparator && 'border-t border-gray-200 dark:border-gray-500'
        )}
      >
        <Button
          text={
            isOpen ? (
              'Close'
            ) : (
              <>
                Learn more{' '}
                <span className="w-4 h-4 ml-2 inline-block">
                  <ArrowRight />
                </span>
              </>
            )
          }
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </>
  );
};

export default LearnMoreDropdown;
