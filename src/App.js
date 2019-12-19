import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import CreateCard from './panels/Create_card'
import Setting_Card from './panels/SettingCard';
import MoreInfo from './panels/MoreInfo'
// import CreateCard from './panels/Create_card';

const App = () => {
	const id_v = new URLSearchParams(window.location.href).get("vk_user_id");
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [dataToDelete, setDataToDelete] = useState(null);
	const [dataToInfo,setDataToInfo] = useState(null);
	const go_c = e => {
			setActivePanel("home");	
	};
	useEffect(() => {
		connect.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			// setPopout(null);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};
//chooseParcels={chooseParcels} setChooseParcels={setChooseParcels} 
	return (
		<View activePanel={activePanel} popout={popout}>
			<CreateCard id='create_card'  go={go_c} id_v={id_v} popout = {popout} setPopout={setPopout}></CreateCard>
			<MoreInfo id="moreInfo" go={go_c} id_v={id_v} dataToInfo={dataToInfo} setPopout={setPopout} ></MoreInfo>
			<Setting_Card id="setting_card" dataToDelete={dataToDelete} go={go_c} id_v={id_v} 
						setPopout={setPopout}
			></Setting_Card>
			<Home id='home' setDataToDelete={setDataToDelete} setDataToInfo={setDataToInfo} id_v={id_v}
							go={go} popout={popout} setPopout={setPopout} 
							setActivePanel={setActivePanel}  activePanel={activePanel}/>

		</View>
	);
}

export default App;

