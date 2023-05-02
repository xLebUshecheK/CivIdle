import { deepFreeze } from "../utilities/Helper";
import { L, t } from "../utilities/i18n";
import { ITechTree, IUnlockableDefinition, IUnlockableGroup } from "./ITechDefinition";
import { Deposit } from "./ResourceDefinitions";
import { RomeHistoryDefinitions, RomeHistoryStageDefinitions } from "./RomeHistoryDefinitions";
import { RomeProvinceDefinitions } from "./RomeProvinceDefinitions";
// import { TechAgeDefinitions, TechDefinitions } from "./TechDefinitions";

export class CityDefinitions {
   Rome: ICityDefinition = {
      name: () => t(L.Rome),
      deposits: {
         Water: 0.02,
         Copper: 0.02,
         Iron: 0.02,
         Wood: 0.02,
         Stone: 0.02,
      },
      size: 40,
      techTree: "Rome",
      unlockable: { ...deepFreeze(new RomeProvinceDefinitions()) },
   };
   Athens: ICityDefinition = {
      name: () => t(L.Rome),
      deposits: {
         Water: 0.02,
         Copper: 0.02,
         Iron: 0.02,
         Wood: 0.02,
         Stone: 0.02,
      },
      size: 40,
      techTree: "Rome",
      unlockable: {},
   };
}

const RomeHistory = deepFreeze(new RomeHistoryDefinitions());

export const TechTree = {
   Rome: {
      definitions: RomeHistory,
      ages: deepFreeze(new RomeHistoryStageDefinitions()),
      verb: () => t(L.Research),
      unlockCost: (k: keyof RomeHistoryDefinitions) => {
         const def = RomeHistory[k];
         return { Science: Math.pow(2, def.column) * 5000 };
      },
   } as ITechTree,
} as const;

const RomeProvince = deepFreeze(new RomeProvinceDefinitions());

export const Unlockable = {
   RomeProvince: {
      definitions: RomeProvince,
      verb: () => t(L.Annex),
      unlockCost: (k: keyof RomeProvinceDefinitions) => {
         const def = RomeProvince[k];
         return { Legion: def.unlockCost };
      },
   } as IUnlockableGroup<typeof RomeProvince>,
} as const;

export type City = keyof CityDefinitions;

interface ICityDefinition {
   deposits: Record<Deposit, number>;
   size: number;
   name: () => string;
   techTree: keyof typeof TechTree;
   unlockable: Record<string, IUnlockableDefinition>;
}
