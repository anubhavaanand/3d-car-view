// All organ models registry
import React from 'react'
import { Model as HeartModel } from './Heart'
import { Model as LungModel } from './Lung'
import { Model as BrainModel } from './Brain'
import { Model as LiverModel } from './Liver'
import { Model as KidneyLeftModel } from './KidneyLeft'
import { Model as KidneyRightModel } from './KidneyRight'
import { Model as PancreasModel } from './Pancreas'
import { Model as EyeLeftModel } from './EyeLeft'
import { Model as EyeRightModel } from './EyeRight'
import { Model as BloodVasculatureModel } from './BloodVasculature'
import { Model as AdiposeModel } from './Adipose'
import { Model as PelvisModel } from './Pelvis'
import { Model as LarynxModel } from './Larynx'
import { Model as ProstateModel } from './Prostate'
import { Model as MouthModel } from './Mouth'
import { Model as PalatineTonsilLeftModel } from './PalatineTonsilLeft'
import { Model as PalatineTonsilRightModel } from './PalatineTonsilRight'
import { Model as RenalPelvisLeftModel } from './RenalPelvisLeft'
import { Model as RenalPelvisRightModel } from './RenalPelvisRight'
import { Model as LymphNodeModel } from './LymphNode'
import { Model as LargeIntestineModel } from './LargeIntestine'
import { Model as IntervertebralDiskModel } from './IntervertebralDisk'
import { Model as KneeLeftModel } from './KneeLeft'
import { Model as KneeRightModel } from './KneeRight'
import { Model as MainBronchusModel } from './MainBronchus'
import { Model as SkinModel } from './Skin'
import { Model as SmallIntestineModel } from './SmallIntestine'
import { Model as SpinalCordModel } from './SpinalCord'
import { Model as SpleenModel } from './Spleen'
import { Model as ThymusModel } from './Thymus'
import { Model as TracheaModel } from './Trachea'
import { Model as UreterLeftModel } from './UreterLeft'
import { Model as UreterRightModel } from './UreterRight'
import { Model as UrinaryBladderModel } from './UrinaryBladder'

export const ORGANS = [
  { id: 'heart', label: 'Heart', component: HeartModel },
  { id: 'lung', label: 'Lung', component: LungModel },
  { id: 'brain', label: 'Brain', component: BrainModel },
  { id: 'liver', label: 'Liver', component: LiverModel },
  { id: 'kidney-left', label: 'Kidney (Left)', component: KidneyLeftModel },
  { id: 'kidney-right', label: 'Kidney (Right)', component: KidneyRightModel },
  { id: 'pancreas', label: 'Pancreas', component: PancreasModel },
  { id: 'eye-left', label: 'Eye (Left)', component: EyeLeftModel },
  { id: 'eye-right', label: 'Eye (Right)', component: EyeRightModel },
  { id: 'blood-vasculature', label: 'Blood Vasculature', component: BloodVasculatureModel },
  { id: 'adipose', label: 'Adipose Tissue', component: AdiposeModel },
  { id: 'pelvis', label: 'Pelvis', component: PelvisModel },
  { id: 'larynx', label: 'Larynx', component: LarynxModel },
  { id: 'prostate', label: 'Prostate', component: ProstateModel },
  { id: 'mouth', label: 'Mouth', component: MouthModel },
  { id: 'palatine-tonsil-left', label: 'Palatine Tonsil (Left)', component: PalatineTonsilLeftModel },
  { id: 'palatine-tonsil-right', label: 'Palatine Tonsil (Right)', component: PalatineTonsilRightModel },
  { id: 'renal-pelvis-left', label: 'Renal Pelvis (Left)', component: RenalPelvisLeftModel },
  { id: 'renal-pelvis-right', label: 'Renal Pelvis (Right)', component: RenalPelvisRightModel },
  { id: 'lymph-node', label: 'Lymph Node', component: LymphNodeModel },
  { id: 'large-intestine', label: 'Large Intestine', component: LargeIntestineModel },
  { id: 'intervertebral-disk', label: 'Intervertebral Disk', component: IntervertebralDiskModel },
  { id: 'knee-left', label: 'Knee (Left)', component: KneeLeftModel },
  { id: 'knee-right', label: 'Knee (Right)', component: KneeRightModel },
  { id: 'main-bronchus', label: 'Main Bronchus', component: MainBronchusModel },
  { id: 'skin', label: 'Skin', component: SkinModel },
  { id: 'small-intestine', label: 'Small Intestine', component: SmallIntestineModel },
  { id: 'spinal-cord', label: 'Spinal Cord', component: SpinalCordModel },
  { id: 'spleen', label: 'Spleen', component: SpleenModel },
  { id: 'thymus', label: 'Thymus', component: ThymusModel },
  { id: 'trachea', label: 'Trachea', component: TracheaModel },
  { id: 'ureter-left', label: 'Ureter (Left)', component: UreterLeftModel },
  { id: 'ureter-right', label: 'Ureter (Right)', component: UreterRightModel },
  { id: 'urinary-bladder', label: 'Urinary Bladder', component: UrinaryBladderModel },
]

export const getOrganById = (id) => {
  return ORGANS.find(organ => organ.id === id)
}
