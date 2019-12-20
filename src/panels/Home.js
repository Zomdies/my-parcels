import React, {  useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';

import ModalPage from '@vkontakte/vkui/dist/components/ModalPage/ModalPage'
import ModalRoot from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot'
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader'
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton'
import FormLayout from '@vkontakte/vkui/dist/components/FormLayout/FormLayout'
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import InfoRow from '@vkontakte/vkui/dist/components/InfoRow/InfoRow'
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import List from '@vkontakte/vkui/dist/components/List/List'
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';

import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Done from '@vkontakte/icons/dist/24/done';



import '../css/Home.css'
import Card_Info from './Card_Info'


function load_info(setParcelsData,setPopout ){
	setPopout(<ScreenSpinner size='large' />);
    fetch("https://cors-anywhere.herokuapp.com/http://moyaposylka.ru/api/v1/trackers/"+chooseParcels[1]+"/"+chooseParcels[2])
    .then(response => response.json())
    .then(result =>{
        try{
            if (result.status) {
				setParcelsData(null);
                console.log(result)}
                else{
                    console.log(result)
					setParcelsData(result);
					// setPopout(null);
                }
        }catch(err){ console.log(err);
        }
        setPopout(null);

    }).catch(err => console.log(err))
}

var chooseParcels = [];
const Home = props => {
	const [activeModal, setActiveModal] = useState(null);
	const [serverData, setServerData] = useState(null);
	const [parcelsData, setParcelsData] = useState(null);

	
	
	// const parcels = ["Мая посылка 1","Мая посылка 2","Мая посылка 3"];
	// const [parcels , setParcels] = useState(["Мая посылка 1","Мая посылка 2","Мая посылка 3"]); //

	useEffect(() => {
		props.setPopout(<ScreenSpinner size='large' />);
		fetch("https://vk-hack.herokuapp.com/get/id"+props.id_v)
				.then(response => response.json())
    			.then(result =>{
        			try{
					
							var a = Object.values(result.tracks);
                    		
							setServerData(result)
							chooseParcels = a;
							
							props.setPopout(null);
        			}catch(err){
						console.log(err);
					}
					props.setPopout(null);
					// load_info(setParcelsData,props.setPopout);
		}).catch(err => console.log(err))
		
		
		// async function fetchData2() {
		
		// 		const server = await sendRequest("GET","https://vk-hack.herokuapp.com/get/id"+id_v); //164078040
		// 		setServerData(server);
		// 		setChooseParcels(server.tracks["track1"]);
		// 		props.setPopout(null);
		// 		// setPopout(<ScreenSpinner size='large' />);
			
		// }

		// fetchData2();
		// fetchData3();
		
		
	}, []);

		
	
	return (
		
		<Panel id={props.id} theme="white">
			<PanelHeader>Мои посылки</PanelHeader>
            <Group className="Parcels_Group" title="Посылки">
				{serverData &&                 	
					<List>
                		{serverData && serverData.tracks && Object.values(serverData.tracks).map(v => Object.values(v))
						.map((item,index) =>{ 
							return(
                    			<Cell className="ParcelsName" id = {index} key={item}  draggable onDragFinish={({ from, to }) => {
                      					// const parcels1 = [...parcels];
                      					// parcels1.splice(from, 1);
                      					// parcels1.splice(to, 0, parcels[from]);
										  // setParcels(parcels1);
										//   console.log(item);
								}}  > <div   onClick={() =>{ chooseParcels = item;
															load_info(setParcelsData,props.setPopout);
															setActiveModal("modal_inform");
															console.log(chooseParcels);
														   	} } >{item[0]}</div></Cell>
							);
							// props.setPopout(null)
						})
							  
						}	 
                	</List>
				}
				{serverData && Object.keys(serverData.tracks).length == 0 &&
					<Cell className="ErrorParcels" >Пока у вас нет посылок</Cell> 
				}
				<Cell className="AddParcels" onClick={props.go} data-to='create_card'>Добавить посылку</Cell>
            </Group>
			
			{chooseParcels&& parcelsData && 
				<Card_Info activeModal={activeModal} setActiveModal={setActiveModal} go={props.go}  id_v={props.id_v}
				chooseParcels={chooseParcels} parcelsData={parcelsData} 
				setPopout={props.setPopout} setDataToDelete={props.setDataToDelete}
				setDataToInfo={props.setDataToInfo}
				setActivePanel={props.setActivePanel}></Card_Info>
			}
			
					
		</Panel>
	);
	
}

Home.propTypes = {
	
};

export default Home;
