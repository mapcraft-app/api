export namespace trigger {
    export const name: string;
    export const builtin: boolean;
    export function _function(args: any): {
        Command: any;
        Player: any;
        Coordinates: {
            P1: any[];
            P2: any[];
        };
    };
    export { _function as function };
}
export namespace cutscene {
    const name_1: string;
    export { name_1 as name };
    const builtin_1: boolean;
    export { builtin_1 as builtin };
    export function _function_1(args: any): {
        Command: any;
        Player: any;
        Type: any;
        NoNotification?: undefined;
        Coordinates?: undefined;
    } | {
        NoNotification: boolean;
        Command: any;
        Player: any;
        Type: any;
        Coordinates: {
            Point: number[];
            Rotation: number[];
        };
    } | {
        NoNotification: boolean;
        Command: any;
        Player: any;
        Type: any;
        Coordinates: {
            Point: number[];
            Rotation?: undefined;
        };
    } | {
        Command: any;
        Player?: undefined;
        Type?: undefined;
        NoNotification?: undefined;
        Coordinates?: undefined;
    };
    export { _function_1 as function };
}
export namespace option {
    const name_2: string;
    export { name_2 as name };
    const builtin_2: boolean;
    export { builtin_2 as builtin };
    export function _function_2(args: any): {
        Command: any;
        Player: any;
        Option: any;
    };
    export { _function_2 as function };
}
