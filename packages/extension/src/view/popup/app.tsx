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
import React from 'react';

/**
 * Internal dependencies.
 */
import './app.css';
import { Legend } from './components';
import { useCookieStore } from './stateProviders/syncCookieStore';
import { COLOR_MAP } from '../design-system/theme/colors';
import { CirclePieChart } from '../design-system/components';

const App: React.FC = () => {
  const { cookieStats } = useCookieStore(({ state }) => ({
    cookieStats: state.tabCookieStats,
  }));

  if (!cookieStats) {
    return (
      <div className="w-96 h-80 flex justify-center items-center flex-col">
        <p className="font-bold text-lg">
          Please refresh this page to view cookies
        </p>
      </div>
    );
  }

  if (
    cookieStats.firstParty.total === 0 &&
    cookieStats.thirdParty.total === 0
  ) {
    return (
      <div className="w-96 h-80 flex justify-center items-center flex-col">
        <p className="font-bold text-lg">No cookies found on this page</p>
      </div>
    );
  }
  const legendData = [
    {
      label: 'Functional',
      count:
        cookieStats.firstParty.functional + cookieStats.thirdParty.functional,
      color: COLOR_MAP.functional,
    },
    {
      label: 'Marketing',
      count:
        cookieStats.firstParty.marketing + cookieStats.thirdParty.marketing,
      color: COLOR_MAP.marketing,
    },
    {
      label: 'Analytics',
      count:
        cookieStats.firstParty.analytics + cookieStats.thirdParty.analytics,
      color: COLOR_MAP.analytics,
    },
    {
      label: 'Uncategorised',
      count:
        cookieStats.firstParty.uncategorised +
        cookieStats.thirdParty.uncategorised,
      color: COLOR_MAP.uncategorised,
    },
  ];

  const firstPartyPiechartData = [
    {
      count: cookieStats.firstParty.functional,
      color: COLOR_MAP.functional,
    },
    {
      count: cookieStats.firstParty.marketing,
      color: COLOR_MAP.marketing,
    },
    {
      count: cookieStats.firstParty.analytics,
      color: COLOR_MAP.analytics,
    },
    {
      count: cookieStats.firstParty.uncategorised,
      color: COLOR_MAP.uncategorised,
    },
  ];

  const thirdPartyPiechartData = [
    {
      count: cookieStats.thirdParty.functional,
      color: COLOR_MAP.functional,
    },
    {
      count: cookieStats.thirdParty.marketing,
      color: COLOR_MAP.marketing,
    },
    {
      count: cookieStats.thirdParty.analytics,
      color: COLOR_MAP.analytics,
    },
    {
      count: cookieStats.thirdParty.uncategorised,
      color: COLOR_MAP.uncategorised,
    },
  ];

  return (
    <div className="w-96 h-80 flex justify-center items-center flex-col">
      <div className="w-full flex-1 flex gap-16 px-12">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full text-center">
            <CirclePieChart
              centerCount={cookieStats.firstParty.total}
              data={firstPartyPiechartData}
              title="1st Party Cookies"
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="w-full text-center">
            <CirclePieChart
              centerCount={cookieStats.thirdParty.total}
              data={thirdPartyPiechartData}
              title="3rd Party Cookies"
            />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Legend legendItemList={legendData} />
      </div>
      <div className="w-full text-center mt-5 px-3 mb-3">
        <p className="text-chart-label text-xs">
          {'Inspect cookies in the "Privacy Sandbox" panel of DevTools'}
        </p>
        <p className="text-xxxs mt-4">
          *Please disable ad/cookie blocking extensions for best results
        </p>
      </div>
    </div>
  );
};

export default App;
