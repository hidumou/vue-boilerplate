/**
 * @file getters
 * Created by haner on 2017/4/10.
 * @brief meeting getter
 */

export const meetingList = (state)=> state.response.records || [];
export const response = (state)=> state.response || {};
export const changeRecordList = (state)=> state.changeRecord.records || {};
export const changeRecordRes = (state)=> state.changeRecord || {};

