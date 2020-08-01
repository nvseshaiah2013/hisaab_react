import {
    REMINDER_ERROR,
    REMINDER_LOADING,
    FETCH_SENT_REMINDERS,
    FETCH_RECEIVED_REMINDERS,
    DELETE_SENT_REMINDER,
    EDIT_SENT_REMINDER,
    MARK_REMINDER_READ,
    CLEAR_REMINDER_MESSAGE,
    SEND_REMINDER,

}
    from './ActionTypes';

export const Reminders = (state = {
    reminder: null,
    isLoading: false,
    message: null,
    status: null,
    sentReminders: [],
    receivedReminders: []
}, action) => {
    switch (action.type) {
        case REMINDER_ERROR: return {
            ...state, isLoading: false,
            status: action.payload.status,
            message: action.payload.message,
        };

        case REMINDER_LOADING: return { ...state, isLoading: true };

        case CLEAR_REMINDER_MESSAGE: return { ...state, status: null, message: null };

        case FETCH_SENT_REMINDERS: return {
            ...state,
            status: action.payload.status,
            message: action.payload.message,
            sentReminders: action.payload.reminders,
            isLoading: false
        }
        case FETCH_RECEIVED_REMINDERS: return {
            ...state,
            status: action.payload.status,
            message: action.payload.message,
            receivedReminders: action.payload.reminders,
            isLoading: false
        };
        case DELETE_SENT_REMINDER: return {
            ...state,
            status: action.payload.status,
            message: action.payload.message,
        };

        case EDIT_SENT_REMINDER: return {
            ...state,
            status: action.payload.status,
            message: action.payload.message
        };
        case MARK_REMINDER_READ: return {
            ...state,
            status: action.payload.status,
            message: action.payload.message
        };
        case SEND_REMINDER: return {
            ...state,
            status: action.payload.status,
            message: action.payload.message,
            sentReminders : state.sentReminders.push(action.payload.reminder)
        };
        default: return state;
    }
}
