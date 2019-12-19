import React,{ useState, useEffect }  from 'react';

import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import { platform, IOS } from '@vkontakte/vkui';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Input from '@vkontakte/vkui/dist/components/Input/Input';
import Select from '@vkontakte/vkui/dist/components/Select/Select';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';


import '../css/SettingCard.css'

const osName = platform();

function sendRequest(method, url){
	return new Promise( (resolve, reject) =>{
		const xhr = new XMLHttpRequest();
		xhr.open(method,url);
		xhr.responseType = 'json';

		xhr.onload = () => {
			if (xhr.status >= 400) {
				reject(xhr.response);
			}else{
				resolve(xhr.response);
			}
		}
		xhr.onerror = () => {
			reject(xhr.response);
		}
		xhr.send();
	});
}

const Setting_Card = props => {
    function delete_form_bd() {
		props.setPopout(<ScreenSpinner size='large' />);
		fetch("https://vk-hack.herokuapp.com/delete?id=id"+props.id_v+"&name="+props.dataToDelete[0]
		+"&track_code="+props.dataToDelete[1]+"&track_id="+props.dataToDelete[2])
    	.then(response =>{
			console.log(response)
			
			props.setPopout(null);
			props.go();
		});
        
		// sendRequest("GET","https://vk-hack.herokuapp.com/delete?id=id"+props.id_v+"&name="+props.chooseParcels[0]+"&track_code="+props.chooseParcels[1]+"&track_id="+props.chooseParcels[2]).then(data => {
		// 	// console.log("good");
		// });
		
	}
    return(
        <Panel id={props.id} theme = "white">
            <PanelHeader
            left={<HeaderButton onClick={props.go} data-to="home">
             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>} alignment="center">
            Добавить</PanelHeader>
		    {props.dataToDelete &&
			    <div>
                    <FormLayout>
                        <p className="info">Вы Уверены что хотете удалить посылку с именем : {props.dataToDelete[0]}</p>
                        
                        <Button size="xl" level='secondary' onClick={delete_form_bd} data-to="home">Да</Button>
                        <Button size="xl" onClick={props.go} data-to="home">Нет</Button>
                    </FormLayout>
				    
			    </div>	
		    }	
		

		
		
		
	</Panel>
    )
}


export default Setting_Card;