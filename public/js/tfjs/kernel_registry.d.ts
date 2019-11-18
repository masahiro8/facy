/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { DataType } from './types';
export declare type DataId = object;
/** These are extra non-tensor/primitive params passed to kernel functions. */
export declare type Attribute = number | number[] | boolean | boolean[] | string | string[] | NamedAttrMap;
/** Specifies the code to run when executing a kernel. */
export declare type KernelFunc = (params: {
    inputs: NamedTensorInfoMap;
    backend: {};
    attrs?: NamedAttrMap;
}) => TensorInfo | TensorInfo[];
/** Function that gets called after the backend initializes. */
export declare type KernelSetupFunc = (backend: {}) => void;
/** Function that gets called right before the backend is disposed. */
export declare type KernelDisposeFunc = KernelSetupFunc;
/** Config object for registering a kernel in the global registry. */
export interface KernelConfig {
    kernelName: string;
    backendName: string;
    kernelFunc: KernelFunc;
    setupFunc?: KernelSetupFunc;
    disposeFunc?: KernelDisposeFunc;
}
/** Holds metadata for a given tensor. */
export interface TensorInfo {
    dataId: DataId;
    shape: number[];
    dtype: DataType;
}
export interface NamedTensorInfoMap {
    [name: string]: TensorInfo;
}
export interface NamedAttrMap {
    [name: string]: Attribute;
}
/**
 * Returns the kernel function (code) associated with the provided names.
 *
 * @param kernelName The official name of the kernel.
 * @param backendName The official name of the backend.
 */
export declare function getKernel(kernelName: string, backendName: string): KernelConfig;
export declare function getKernelsForBackend(backendName: string): KernelConfig[];
/**
 * Registers the function (forward pass) for the kernel in a global registry.
 *
 * @param config A config object with the following properties:
 * - `kernelName` The official name of the kernel.
 * - `backendName` The official name of the backend.
 * - `kernelFunc` The function to run during the forward pass of the kernel.
 * - `setupFunc` Optional. Gets called once, after the backend initializes.
 * - `disposeFunc` Optional. Gets called once, right before the backend is
 * disposed.
 */
export declare function registerKernel(config: KernelConfig): void;
/**
 * Removes the kernel function from the registry.
 *
 * @param kernelName The official name of the kernel.
 * @param backendName The official name of the backend.
 *
 */
export declare function unregisterKernel(kernelName: string, backendName: string): void;
