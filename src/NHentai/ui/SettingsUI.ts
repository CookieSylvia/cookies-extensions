import {
  RequestManager,
  SourceStateManager, 
} from '@paperback/types';
import {
  LangDefs,
  SortDefs, 
} from '../models';
import {
  Resettings,
  SearchHistoryEntry,
  SettingKeys,
  resetSettings,
} from '../Resettings';
import { Data } from '../Data';

export const settingsNavButton = (states: SourceStateManager, requests: RequestManager) => {
  return App.createDUINavigationButton({
    id: 'settings',
    label: 'Settings',
    form: App.createDUIForm({
      sections: async () => [
        noticesSection(states, requests),
        settingsSection(states),
        webSection(states),
        dangerSection(states),
      ],
    }),
  });
};

export const noticesSection = (states: SourceStateManager, requests: RequestManager) =>
  App.createDUISection({
    id: 'notices',
    header: 'Notices',
    isHidden: false,
    rows: async () => [
      App.createDUIMultilineLabel({
        id: 'notice_unstable',
        label: 'Unstable',
        value: 'Changing settings is very unstable atm. but it should still be possible with a few tries.',
      }),
      noticesMoreNavButton(states, requests),
    ],
  });

export const noticesMoreNavButton = (states: SourceStateManager, requests: RequestManager) =>
  App.createDUINavigationButton({
    id: 'notice_detailed_nav',
    label: 'View all notices',
    form: App.createDUIForm({
      sections: async () => Promise.all([
        noticesMoreSection(states, requests),
      ]),
    }),
  });

export const noticesMoreSection = (states: SourceStateManager, requests: RequestManager) =>
  App.createDUISection({
    id: 'notice_detailed',
    header: 'Notices',
    isHidden: false,
    rows: async () => [
      App.createDUIMultilineLabel({
        id: 'notice_unstable',
        label: 'Unstable',
        value: 'Changing settings is very unstable atm. but it should still be possible with a few tries.\n(As far as I know, this is a bug in the app? Since the official extension settings also crashes sometimes.)',
      }),
      App.createDUIMultilineLabel({
        id: 'notice_ua',
        label: 'User Agent',
        value: await requests.getDefaultUserAgent(),
      }),
      App.createDUIMultilineLabel({
        id: 'notice_settingkeys',
        label: 'Setting Keys (found)',
        value: await(async (states: SourceStateManager) => {
          let str = '';
          for (const key of Object.values(SettingKeys)) {
            str += `${key}: ${yesno(await Resettings.has(states, key))}\n`;
          }
          return str.trimEnd();
        })(states),
      }),
      App.createDUIMultilineLabel({
        id: 'notice_sourceinfo',
        label: 'Source Info',
        value: Object.entries(Data.info)
          .filter(([,value]) => typeof value === 'string')
          .map(([key, value]) => `${key}: ${value}`).join('\n'),
      }),
    ],
  });

export const settingsSection = (states: SourceStateManager) =>
  App.createDUISection({
    id: 'settings_content',
    header: 'nhentai',
    footer: 'Modify the nhentai experience to your liking.',
    isHidden: false,
    rows: async () => {
      return [
        App.createDUISelect({
          id: 'language',
          label: 'Language',
          options: LangDefs.getSources(true),
          labelResolver: async (option) => LangDefs.getLocalizedName(option),
          value: App.createDUIBinding({
            get: async () => [await Resettings.get(states, SettingKeys.Language)],
            set: async (val) => {
              await Resettings.setLanguage(states, val?.[0]);
            },
          }),
          allowsMultiselect: false,
        }),
        App.createDUISelect({
          id: 'sorting',
          label: 'Sort by',
          options: SortDefs.getSources(true),
          labelResolver: async (option) => SortDefs.getName(option),
          value: App.createDUIBinding({
            get: async () => [await Resettings.get(states, SettingKeys.Sorting)],
            set: async (val) => {
              await Resettings.setSorting(states, val?.[0]);
            },
          }),
          allowsMultiselect: false,
        }),
        App.createDUIInputField({
          id: 'search_suffix',
          label: 'Additional arguments',
          value: App.createDUIBinding({
            get: () => Resettings.get(states, SettingKeys.SearchSuffix),
            set: async (val) => {
              await Resettings.setSearchSuffix(states, val);
            },
          }),
        }),
      ];
    },
  });

export const webSection = (states: SourceStateManager) =>
  App.createDUISection({
    id: 'web',
    header: 'Web Requests',
    footer: 'Double search requests two pages per search. Enable this if your searches stops loading after 1 page.',
    isHidden: false,
    rows: async () => [
      storedSearchHistoryNavButton(states),
      App.createDUISwitch({
        id: 'double_search',
        label: 'Double search (Slower)',
        value: App.createDUIBinding({
          get: () => Resettings.get(states, SettingKeys.DoubleSearch),
          set: async (val) => {
            await Resettings.set(states, SettingKeys.DoubleSearch, val);
          },
        }),
      }),
      App.createDUISwitch({
        id: 'always_fallback',
        label: 'Always Fallback (Debug)',
        value: App.createDUIBinding({
          get: () => Resettings.get(states, SettingKeys.AlwaysFallback),
          set: async (val) => {
            await Resettings.set(states, SettingKeys.AlwaysFallback, val);
          },
        }),
      }),
    ],
  });

export const dangerSection = (states: SourceStateManager) =>
  App.createDUISection({
    id: 'danger',
    header: 'Danger Zone',
    footer: 'You might need to restart the app for some changes to apply visually.',
    isHidden: false,
    rows: async () => [
      resetSettings(states),
    ],
  });

export const storedSearchHistoryNavButton = (states: SourceStateManager) =>
  App.createDUINavigationButton({
    id: 'debug_settings_history',
    label: 'Search history',
    form: App.createDUIForm({
      sections: async () => Promise.all([
        clearSearchHistorySection(states),
        storedSearchHistorySection(states),
      ]),
    }),
  });

export const clearSearchHistorySection = async (states: SourceStateManager) =>
  App.createDUISection({
    id: 'debug_settings_history_clear',
    header: 'Search History',
    footer: `Search history currently saves up to ${await Resettings.get(states, SettingKeys.CollectSearchesLimit)} entries.\n(You need to clear history after lowering the limit.)`,
    isHidden: false,
    rows: async () => [
      App.createDUISwitch({
        id: 'search_history_toggle',
        label: 'Enable Search Collection',
        value: App.createDUIBinding({
          get: () => Resettings.get(states, SettingKeys.CollectSearches),
          set: async (val) => {
            await Resettings.set(states, SettingKeys.CollectSearches, val);
          },
        }),
      }),
      App.createDUIStepper({
        id: 'search_history_limit',
        label: 'Entry Limit',
        min: 10,
        max: 100,
        step: 5,
        value: App.createDUIBinding({
          get: () => Resettings.get(states, SettingKeys.CollectSearchesLimit),
          set: async (val) => {
            await Resettings.setLimit(states, val);
          },
        }),
      }),
      App.createDUIButton({
        id: 'debug_settings_clear_search_history',
        label: 'Clear search history...',
        onTap: async () => {
          await Resettings.set(states, SettingKeys.SearchHistory);
        },
      }),
    ],
  });

export const storedSearchHistorySection = async (states: SourceStateManager) =>
  App.createDUISection({
    id: 'debug_settings_history_data',
    header: 'Entries (Newest first' + (await Resettings.get(states, SettingKeys.CollectSearches) ? ')' : ' | Frozen)'),
    isHidden: false,
    rows: async () => {
      const entries = await Resettings.get(states, SettingKeys.SearchHistory);
      if (entries.length <= 0) {
        return [App.createDUILabel({
          id: 'debug_settings_history_empty',
          label: 'Search history is empty.',
        })];
      }
      return entries.map((entry, idx) => {
        return App.createDUIMultilineLabel({
          id: `debug_settings_history_data[${idx}]`,
          label: `Entry #${idx + 1}`,
          value: stringifySearchEntry(entry),
        });
      });
    },
  });

const dedent = (str: string, preserveEmpty = false) => str.replace(preserveEmpty ? /\n[^\S\r\n]*/g : /\n\s*/g, '\n');
const yesno = (bool: boolean): string => (bool ? 'yes' : 'no');
const stringifySearchEntry = (entry: SearchHistoryEntry): string => {
  return dedent(`
    Text: ${entry.text}
    Sort: ${entry.sort ?? 'unknown'}
    Status: ${entry.status ?? 'unknown'}
    CfChallenge: ${entry.challenged ?? 'unknown'}
    Skipped: ${yesno(entry.skipped ?? false)}
    Stopped: ${yesno(entry.stopped ?? false)}
    Should stop: ${yesno(entry.shouldStop ?? false)}
    Reason: ${entry.reason ?? '<none>'}
    Fallback: ${yesno(entry.fallback ?? false)}
    Next: ${entry.nextPage ?? 'unknown'}
    Max: ${entry.maxPage ?? 'unknown'}
    `.trim());
};
