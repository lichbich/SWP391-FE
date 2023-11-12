import Toast from "@/components/Toast";
import {createApp} from 'vue'
const install = (app) => {
    let container;
    let toastApp;
    const baseProps = {
        close:()=> {
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
        const props = {...baseProps,...msg,...{success}}
        props.close();
        container = document.createElement('div');
        container.setAttribute('id','ToastPlug');
        document.body.appendChild(container);
        toastApp = createApp(Toast, props);
        toastApp.mount(container);
    }

    app.config.globalProperties.$toast = toast;
    app.config.globalProperties.$closeToast = baseProps.close;
}

export default install;