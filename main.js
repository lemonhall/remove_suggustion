// ==UserScript==
// @name         remove google suggustion
// @namespace    http://tampermonkey.net/
// @version      2025-02-08
// @description  try to take over the world!
// @author       lemonhall2012@qq.com
// @match        https://www.google.com.hk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=duckduckgo.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const cleanUpInput = (input) => {
        // 快速属性清理
        input.autocomplete = 'off';
        input.setAttribute('autocomplete', 'off');

        // 事件拦截器
        const blockEvent = e => {
            e.stopImmediatePropagation();
            if(e.type === 'input') e.preventDefault();
        };

        // 仅拦截必要事件
        input.addEventListener('input', blockEvent, true);
        input.addEventListener('keydown', blockEvent, true);

        console.log('Google suggestions blocked');
    };

    // 高效定位（使用最新版Google的DOM特征）
    const findInput = () => {
        return document.querySelector('textarea[aria-label="Search"], input[aria-label="Search"]')
               || document.querySelector('[name="q"]');
    };

    // 智能单次触发机制
    const init = () => {
        const input = findInput();
        if(input) {
            cleanUpInput(input);
        } else {
            // 极简检测（仅重试一次）
            setTimeout(() => {
                const retryInput = findInput();
                if(retryInput) cleanUpInput(retryInput);
            }, 300);
        }
    };

    // 轻量级启动
    if(document.readyState === 'complete') {
        init();
    } else {
        window.addEventListener('load', init, {once: true});
    }
})();
