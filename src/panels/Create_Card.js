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

import '../css/Creare_card.css';

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

const CardCreator = props => {
    
    const [serverData, setServerData] = useState(null);
    const [senderData,setSenderData] = useState(null);
	useEffect(() => {
		async function fetchData2() {
				const server = await sendRequest("GET","https://vk-hack.herokuapp.com/get/id"+props.id_v); //164078040
				setServerData(server);
			
        }
        fetchData2();
       
		
		
    }, []);
    //be004f5d5ff8b37eaa87fab8f0ad0887
    function addCard_to_BD(e){
        var  carriers = "";
        props.setPopout(<ScreenSpinner size='large' />);
        

        fetch("https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/carriers/"+document.getElementById("input_track_id").value)
        .then(response => response.json())
        .then(result =>{
            fetch('https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/trackers/'+result[0].code+'/'+document.getElementById("input_track_id").value+'?api_key=be004f5d5ff8b37eaa87fab8f0ad0887',{method: 'post'})
            .then(data => {
                fetch("https://cors-anywhere.herokuapp.com/https://moyaposylka.ru/api/v1/trackers/"+result[0].code+"/"+document.getElementById("input_track_id").value)
                .then(response => response.json())
                .then(result =>{
                    console.log(result)
        
                }).catch(err => {console.log(err); props.go(1)})

                sendRequest('GET',"https://vk-hack.herokuapp.com/set?id=id"+props.id_v+"&name="+document.getElementById("input_name").value
                    +"&track_code="+result[0].code+"&track_id="+document.getElementById("input_track_id").value).then(data => {
                        if (data != null) {props.go(1); props.setPopout(null);}
                    }).catch(err => console.log(err));
            }).catch(err => {alert("Error не корректный номер отслеживания"); props.go(1)})
            
    
        }).catch(err => {alert("Error не корректный номер отслеживания"); props.go(1)})
        
                
        
                 //+(serverData.count_cards && (serverData.count_cards+1))
                // props.go(data-to="persik");
        
        
    }
    // data-to="persik"
    return(
        <Panel id={props.id} theme = "white">
            <PanelHeader
            left={<HeaderButton onClick={props.go} data-to="home">
             {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        </HeaderButton>} alignment="center">
            Добавить</PanelHeader>
			    <div>
                    <FormLayout>
                        <p className="info">Введите информацию</p>
                        <Input id ="input_name" type="text" placeholder="Введите название посылки"/>
                        {/* <Input id = "input_track_code" type="number" placeholder="Ввидите id карты"/> */}
                        <Input className="text_in" id = "input_track_id" type="text" placeholder="Введите трек номер"/>
                        
                        <Button size="xl" onClick={() =>{if (document.getElementById("input_name").value != "") addCard_to_BD(); else{
                            alert("Error не корректное имя посылки");
                           
                        }

                        
                        }} data-to="home">Создать</Button>
                    </FormLayout>
				    
			    </div>	
		

		
		
		
	</Panel>
    )
}

CardCreator.propTypes = {
    id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	
};

export default CardCreator;