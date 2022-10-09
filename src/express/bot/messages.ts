export const createQueueCommand = /^\/create [A-Za-zА-Яа-я_]{3,10}$/
export const showQueuesCommand = /^\/show$/
export const takeQueueCommand = /^\/take [A-Za-zА-Яа-я_]{3,10}$/
export const showQueueCommand = /^\/show [A-Za-zА-Яа-я_]{3,10}$/
export const deleteQueueCommand = /^\/delete [A-Za-zА-Яа-я_]{3,10}$/
export const helpCommand = /^\/help$/
export const startCommand = /^\/start$/
export const testCommand = /^\/test$/





export const startMessage = `Привет, я бот очередей.\nЧтобы создать очередь, напиши /create <имя очереди>.\nЧтобы посмотреть все очереди, напиши /show.\nЧтобы встать в очередь, напиши /take <имя очереди>.\nЧтобы посмотреть очередь, напиши /show <имя очереди>.`

