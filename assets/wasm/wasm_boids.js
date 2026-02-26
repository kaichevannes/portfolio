import { startWorkers } from './snippets/wasm-bindgen-rayon-38edf6e439f6d70d/src/workerHelpers.no-bundler.js';

let wasm;

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.buffer !== wasm.memory.buffer) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().slice(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

export function init_panic_hook() {
    wasm.init_panic_hook();
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}
/**
 * @param {number} num_threads
 * @returns {Promise<any>}
 */
export function initThreadPool(num_threads) {
    const ret = wasm.initThreadPool(num_threads);
    return ret;
}

/**
 * @param {number} receiver
 */
export function wbg_rayon_start_worker(receiver) {
    wasm.wbg_rayon_start_worker(receiver);
}

/**
 * @enum {0 | 1 | 2}
 */
export const Preset = Object.freeze({
    Basic: 0, "0": "Basic",
    Maruyama: 1, "1": "Maruyama",
    Zhang: 2, "2": "Zhang",
});

const BoidFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boid_free(ptr >>> 0, 1));

export class Boid {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoidFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boid_free(ptr, 0);
    }
    /**
     * @returns {Vec2}
     */
    get position() {
        const ret = wasm.__wbg_get_boid_position(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2} arg0
     */
    set position(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_boid_position(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec2}
     */
    get velocity() {
        const ret = wasm.__wbg_get_boid_velocity(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2} arg0
     */
    set velocity(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_boid_velocity(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {Vec2}
     */
    get acceleration() {
        const ret = wasm.__wbg_get_boid_acceleration(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
     * @param {Vec2} arg0
     */
    set acceleration(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_boid_acceleration(this.__wbg_ptr, ptr0);
    }
}

const BuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_builder_free(ptr >>> 0, 1));

export class Builder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Builder.prototype);
        obj.__wbg_ptr = ptr;
        BuilderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BuilderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_builder_free(ptr, 0);
    }
    /**
     * @param {Preset} preset
     * @returns {Builder}
     */
    static from_preset(preset) {
        const ret = wasm.builder_from_preset(preset);
        return Builder.__wrap(ret);
    }
    /**
     * @returns {Builder}
     */
    static from_default() {
        const ret = wasm.builder_from_default();
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} count
     * @returns {Builder}
     */
    number_of_boids(count) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_number_of_boids(ptr, count);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} density
     * @returns {Builder}
     */
    density(density) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_density(ptr, density);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} size
     * @returns {Builder}
     */
    grid_size(size) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_grid_size(ptr, size);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} noise_fraction
     * @returns {Builder}
     */
    noise_fraction(noise_fraction) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_noise_fraction(ptr, noise_fraction);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} weighting
     * @returns {Builder}
     */
    attraction_weighting(weighting) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_attraction_weighting(ptr, weighting);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} weighting
     * @returns {Builder}
     */
    alignment_weighting(weighting) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_alignment_weighting(ptr, weighting);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} weighting
     * @returns {Builder}
     */
    separation_weighting(weighting) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_separation_weighting(ptr, weighting);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} radius
     * @returns {Builder}
     */
    attraction_radius(radius) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_attraction_radius(ptr, radius);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} radius
     * @returns {Builder}
     */
    alignment_radius(radius) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_alignment_radius(ptr, radius);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} radius
     * @returns {Builder}
     */
    separation_radius(radius) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_separation_radius(ptr, radius);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} magnitude
     * @returns {Builder}
     */
    maximum_velocity(magnitude) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_maximum_velocity(ptr, magnitude);
        return Builder.__wrap(ret);
    }
    /**
     * @param {boolean} naive
     * @returns {Builder}
     */
    naive(naive) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_naive(ptr, naive);
        return Builder.__wrap(ret);
    }
    /**
     * @param {number} boids_per_thread
     * @returns {Builder}
     */
    number_of_boids_per_thread(boids_per_thread) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_number_of_boids_per_thread(ptr, boids_per_thread);
        return Builder.__wrap(ret);
    }
    /**
     * @param {boolean} multithreaded
     * @returns {Builder}
     */
    multithreaded(multithreaded) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_multithreaded(ptr, multithreaded);
        return Builder.__wrap(ret);
    }
    /**
     * @returns {Universe}
     */
    build() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.builder_build(ptr);
        return Universe.__wrap(ret);
    }
}

const UniverseFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_universe_free(ptr >>> 0, 1));

export class Universe {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Universe.prototype);
        obj.__wbg_ptr = ptr;
        UniverseFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        UniverseFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_universe_free(ptr, 0);
    }
    /**
     * Returns the default [`universe::Builder`].
     *
     * Use this method when creating a custom [`Universe`]
     *
     * For presets, see [`Universe.build_from_preset`] and [`universe::Builder.from_preset`].
     * @returns {Builder}
     */
    static builder() {
        const ret = wasm.universe_builder();
        return Builder.__wrap(ret);
    }
    /**
     * Construct a new Universe from a [`universe::Preset`].
     *
     * To modify the preset, use [`universe::Builder.from_preset`].
     * @param {Preset} preset
     * @returns {Universe}
     */
    static build_from_preset(preset) {
        const ret = wasm.universe_build_from_preset(preset);
        return Universe.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    get_boids_pointer() {
        const ret = wasm.universe_get_boids_pointer(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Advance time by one tick.
     *
     * This will perform a state update for every Boid in the universe.
     */
    tick() {
        wasm.universe_tick(this.__wbg_ptr);
    }
    /**
     * @param {number} n
     */
    set_number_of_boids(n) {
        wasm.universe_set_number_of_boids(this.__wbg_ptr, n);
    }
    /**
     * @param {number} fraction
     */
    set_noise_fraction(fraction) {
        wasm.universe_set_noise_fraction(this.__wbg_ptr, fraction);
    }
    /**
     * @param {number} density
     */
    set_density(density) {
        wasm.universe_set_density(this.__wbg_ptr, density);
    }
    /**
     * @param {number} weighting
     */
    set_attraction_weighting(weighting) {
        wasm.universe_set_attraction_weighting(this.__wbg_ptr, weighting);
    }
    /**
     * @param {number} weighting
     */
    set_alignment_weighting(weighting) {
        wasm.universe_set_alignment_weighting(this.__wbg_ptr, weighting);
    }
    /**
     * @param {number} weighting
     */
    set_separation_weighting(weighting) {
        wasm.universe_set_separation_weighting(this.__wbg_ptr, weighting);
    }
    /**
     * @param {number} radius
     */
    set_attraction_radius(radius) {
        wasm.universe_set_attraction_radius(this.__wbg_ptr, radius);
    }
    /**
     * @param {number} radius
     */
    set_alignment_radius(radius) {
        wasm.universe_set_alignment_radius(this.__wbg_ptr, radius);
    }
    /**
     * @param {number} radius
     */
    set_seperation_radius(radius) {
        wasm.universe_set_seperation_radius(this.__wbg_ptr, radius);
    }
    /**
     * @param {boolean} multithreaded
     */
    set_multithreaded(multithreaded) {
        wasm.universe_set_multithreaded(this.__wbg_ptr, multithreaded);
    }
    /**
     * @param {number} boids_per_thread
     */
    set_boids_per_thread(boids_per_thread) {
        wasm.universe_set_boids_per_thread(this.__wbg_ptr, boids_per_thread);
    }
    /**
     * @param {number} maximum_velocity
     */
    set_maximum_velocity(maximum_velocity) {
        wasm.universe_set_maximum_velocity(this.__wbg_ptr, maximum_velocity);
    }
    /**
     * @returns {number}
     */
    get_density() {
        const ret = wasm.universe_get_density(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_size() {
        const ret = wasm.universe_get_size(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_number_of_boids() {
        const ret = wasm.universe_get_number_of_boids(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    get_noise_fraction() {
        const ret = wasm.universe_get_noise_fraction(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_attraction_weighting() {
        const ret = wasm.universe_get_attraction_weighting(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_alignment_weighting() {
        const ret = wasm.universe_get_alignment_weighting(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_separation_weighting() {
        const ret = wasm.universe_get_separation_weighting(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_attraction_radius() {
        const ret = wasm.universe_get_attraction_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_alignment_radius() {
        const ret = wasm.universe_get_alignment_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_separation_radius() {
        const ret = wasm.universe_get_separation_radius(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_maximum_velocity() {
        const ret = wasm.universe_get_maximum_velocity(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {boolean}
     */
    get_multithreaded() {
        const ret = wasm.universe_get_multithreaded(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    get_boids_per_thread() {
        const ret = wasm.universe_get_boids_per_thread(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const Vec2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec2_free(ptr >>> 0, 1));

export class Vec2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec2.prototype);
        obj.__wbg_ptr = ptr;
        Vec2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec2_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get 0() {
        const ret = wasm.__wbg_get_vec2_0(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set 0(arg0) {
        wasm.__wbg_set_vec2_0(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get 1() {
        const ret = wasm.__wbg_get_vec2_1(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set 1(arg0) {
        wasm.__wbg_set_vec2_1(this.__wbg_ptr, arg0);
    }
}

const wbg_rayon_PoolBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wbg_rayon_poolbuilder_free(ptr >>> 0, 1));

export class wbg_rayon_PoolBuilder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
        obj.__wbg_ptr = ptr;
        wbg_rayon_PoolBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        wbg_rayon_PoolBuilderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    mainJS() {
        const ret = wasm.wbg_rayon_poolbuilder_mainJS(this.__wbg_ptr);
        return ret;
    }
    /**
     * @returns {number}
     */
    numThreads() {
        const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    receiver() {
        const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
        return ret >>> 0;
    }
    build() {
        wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_getRandomValues_80578b2ff2a093ba = function() { return handleError(function (arg0) {
        globalThis.crypto.getRandomValues(arg0);
    }, arguments) };
    imports.wbg.__wbg_instanceof_Window_def73ea0955fc569 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Window;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_startWorkers_2329d931beb7bef4 = function(arg0, arg1, arg2) {
        const ret = startWorkers(arg0, arg1, wbg_rayon_PoolBuilder.__wrap(arg2));
        return ret;
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_static_accessor_URL_151cb8815849ce83 = function() {
        const ret = import.meta.url;
        return ret;
    };
    imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    };
    imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_module = function() {
        const ret = __wbg_init.__wbindgen_wasm_module;
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {
    imports.wbg.memory = memory || new WebAssembly.Memory({initial:18,maximum:16384,shared:true});
}

function __wbg_finalize_init(instance, module, thread_stack_size) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;

    if (typeof thread_stack_size !== 'undefined' && (typeof thread_stack_size !== 'number' || thread_stack_size === 0 || thread_stack_size % 65536 !== 0)) { throw 'invalid stack size' }
    wasm.__wbindgen_start(thread_stack_size);
    return wasm;
}

function initSync(module, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module, memory, thread_stack_size} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports, memory);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module, thread_stack_size);
}

async function __wbg_init(module_or_path, memory) {
    if (wasm !== undefined) return wasm;

    let thread_stack_size
    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path, memory, thread_stack_size} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('wasm_boids_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports, memory);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module, thread_stack_size);
}

export { initSync };
export default __wbg_init;
