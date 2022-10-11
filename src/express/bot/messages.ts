export const createQueueCommand = /^\/create [A-Za-zА-Яа-я_0-9]{3,10}$/
export const showQueuesCommand = /^\/show$/
export const takeQueueCommand = /^\/take [A-Za-zА-Яа-я_0-9]{3,10}$/
export const showQueueCommand = /^\/show [A-Za-zА-Яа-я_0-9]{3,10}$/
export const deleteQueueCommand = /^\/delete [A-Za-zА-Яа-я_0-9]{3,10}$/
export const helpCommand = /^\/help$/
export const startCommand = /^\/start$/
export const testCommand = /^\/test$/
export const addUserRoleCommand = /^\/add(u|U)ser [a-z]{4,10} [A-Za-z_0-9]{5,32}$/
export const changeUserRoleCommand = /^\/change(u|U)ser [a-z]{4,10} [A-Za-z_0-9]{5,32}$/
export const deleteUserCommand = /^\/delete(u|U)ser [A-Za-z_0-9]{5,32}$/
export const showUsersCommand = /^\/show(u|U)sers$/


export const roleErrorMessage = "У вас недостаточно прав для выполнения данной команды по следующим причинам: \n1. Вы не являетесь администратором\n2. Вы не являетесь модератором \n3. Вас нет в whitelist`е"
export const startMessage = `Привет, я бот очередей.\nЧтобы создать очередь, напиши /create <имя очереди>.\nЧтобы посмотреть все очереди, напиши /show.\nЧтобы встать в очередь, напиши /take <имя очереди>.\nЧтобы посмотреть очередь, напиши /show <имя очереди>.`
export const helpAdminMessage = `Команды администратора \n1. /adduser <роль> <имя пользователя> - добавить пользователя в whitelist\n2. /deleteuser <имя пользователя> - удалить пользователя из whitelist\n3. /showusers - показать всех пользователей в whitelist\n4. /delete <имя очереди> - удалить очередь\n5. /test - проверить права пользователя`

