const initialState = {
    open: false,
    view:true,

    };


export default function reducer(state = initialState, action) {
    console.log('reducer==>', state.count, action);
    
    switch (action.type) {

        case 'DRAWER_OPEN':
            return {
                open: !state.open
            };
        
        case 'CHANGE_VIEW':
            return{
                view:!state.view 
            } 
        default:
            return state;
    }
}