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
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

/**
 * Internal dependencies.
 */
import Circle from '..';
import { COLOR_MAP } from '@cookie-analysis-tool/design-system';

describe('Circle', () => {
  it('renders the Circle with the correct background color', () => {
    const { container } = render(<Circle color={COLOR_MAP.functional} />);

    // Check if the Circle div has the correct background color style
    const circleDiv = container.querySelector('div');
    expect(circleDiv).toHaveStyle(`background-color: ${COLOR_MAP.functional}`);
  });
});
