import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from '@/utils/zustand.helper';

type UIPreferenceState = {
  lastVisitedProjectId: string | undefined;
};

type UIPReferenceAction = {
  setLastVisitedProjectId: (projectId?: string) => void;
};

const initState: UIPreferenceState = {
  lastVisitedProjectId: undefined,
};

type UIPreferenceStateAndAction = UIPreferenceState & {
  actions: UIPReferenceAction;
};

const useUIPreferenceStoreBase = create<UIPreferenceStateAndAction>()(
  persist(
    devtools(
      immer(set => ({
        ...initState,
        actions: {
          setLastVisitedProjectId: (projectId?: string) => {
            set(state => {
              state.lastVisitedProjectId = projectId;
            });
          },
        },
      })),
      {
        enabled: true,
        name: 'ui-preference-store',
        store: 'ui-preference-store',
      },
    ),
    {
      name: 'ui-preference-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => {
        return {
          lastVisitedProjectId: state.lastVisitedProjectId,
        };
      },
    },
  ),
);

export const useUIPreferenceStore = createSelectors(useUIPreferenceStoreBase);
