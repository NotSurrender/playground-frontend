/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  VNodeWithVeeContext,
  ValidationFlags,
  ValidationResult,
  VeeObserver,
} from "vee-validate/dist/types/types";
import { CombinedVueInstance } from "vue/types/vue";

export type Observer = CombinedVueInstance<
  {
    errors: string[];
    value: undefined;
    initialized: boolean;
    initialValue: undefined;
    flags: ValidationFlags;
    failedRules: {};
    isActive: boolean;
    fieldName: string;
    id: string;
  } & {
    setFlags(flags: Partial<ValidationFlags>): void;
    syncValue(v: any): void;
    reset(): void;
    validate(...args: any[]): Promise<ValidationResult>;
    validateSilent(): Promise<ValidationResult>;
    setErrors(errors: string[]): void;
    applyResult({
      errors,
      failedRules,
      regenerateMap,
    }: Pick<
      ValidationResult,
      "required" | "errors" | "failedRules" | "regenerateMap"
    >): void;
    registerField(): void;
    checkComputesRequiredState(): boolean;
  } & {
    fieldDeps: string[];
    normalizedEvents: string[];
    isRequired: boolean;
    classes: Record<string, boolean>;
    normalizedRules: {
      [x: string]: any;
    };
  } & {
    vid: string;
    name: string;
    mode: TimerHandler;
    rules: any;
    immediate: boolean;
    bails: boolean;
    skipIfEmpty: boolean;
    debounce: number;
    tag: string;
    slim: boolean;
    disabled: boolean;
    customMessages: any;
    detectInput: boolean;
  } & Vue & {
      $_veeObserver: VeeObserver;
      _needsValidation: boolean;
      _inputEventName: string;
      _ignoreImmediate: boolean;
      _pendingValidation?: Promise<ValidationResult> | undefined;
      _pendingReset?: boolean | undefined;
      _resolvedRules: any;
      _regenerateMap?: Record<string, () => string> | undefined;
      _veeWatchers: Record<string, Function>;
      $veeDebounce?: number | undefined;
      $veeHandler?: Function | undefined;
      $veeOnInput?: Function | undefined;
      $veeOnBlur?: Function | undefined;
      $vnode: VNodeWithVeeContext;
      $localeHandler: Function;
    },
  object,
  object,
  object,
  Record<never, any>
>;
