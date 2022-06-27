import React, {useEffect, useState} from 'react';

/**
 * 로컬 스토리지 존재 확인
 * @constructor
 */
const LocalStorageExists = () => {
    if(typeof window.JSON === "undefined") return false;
    if(typeof window.localStorage === "undefined") return false;
    else return true;
}

/**
 * 로컬 스토리지 저장
 * @param name      스토리지명
 * @param value     스토리지 값
 * @constructor
 */
export const SetLocalStorage = (name: string, value: any) => {
    if(!LocalStorageExists()) return false;
    let _value = null;
    if(typeof value === "object") _value = window.JSON.stringify(value);
    else _value = value;

    window.localStorage.setItem(name, _value);
    return true;
}

/**
 * 로컬 스토리지 불러오기
 * @param name      스토리지명
 * @constructor
 */
export const GetLocalStorage = (name: string) => {
    if(!LocalStorageExists()) return false;
    return window.localStorage.getItem(name);
}

const Storage = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, [loading]);
}

export default Storage;