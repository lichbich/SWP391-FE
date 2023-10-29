import Toast from "@/components/Toast";
import {createApp} from 'vue'
const install = (app) => {
    let container;
    let toastApp;
    const baseProps = {
        close:()=> {
            console.log('aaaaaaaaaaaa')
            if (toastApp)
                toastApp.unmount(container);

            container = document.querySelector('#ToastPlug');
            if(container)
                document.body.removeChild(container);
        }
    };

    const toast = (msg,success)=>{
        if(typeof msg === 'string')
            msg = {msg};
        console.log(baseProps)
        const props = {...baseProps,...msg,...{success}}
        console.log('props:',JSON.stringify(props));
        props.close();
        container = document.createElement('div');
        container.setAttribute('id','ToastPlug');
        document.body.appendChild(container);
        toastApp = createApp(Toast, props);
        toastApp.mount(container);
    }

    // set 'toast()' and 'close()' globally
    app.config.globalProperties.$toast = toast;
    app.config.globalProperties.$closeToast = baseProps.close;
}

export default install;