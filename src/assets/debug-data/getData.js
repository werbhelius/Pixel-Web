import * as user from './data/userInfo'
import * as status from './data/status'
import * as notify from './data/notify'
import * as friendship from './data/friendship'
import * as content from './data/content'


var userInfo = user.userInfo
var hometimeline = status.hometimeline
var publictimeline = status.publictimeline
var metimelime = status.metimeline
var atmestatus = notify.atmestatus
var atmecomment = notify.atmecomment
var receivecomment = notify.receivecomment
var sendcomment = notify.sendcomment
var myfollowers = friendship.myfollowers
var myfriends = friendship.myfriends
var contentcomment = content.comment

export {
    userInfo,
    hometimeline,
    publictimeline,
    metimelime,
    atmestatus,
    atmecomment,
    receivecomment,
    sendcomment,
    myfollowers,
    myfriends,
    contentcomment
}