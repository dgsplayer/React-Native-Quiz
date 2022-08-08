import apisauce from 'apisauce';

  const create = (bearer = "", baseURL = 'https://todasautopecasloja.com.br/api/quiz/jsonLer.php') => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer '+ bearer
    },
    timeout: 300000
  });

  const listCategories = (level) => api.post('',{level:level})
  const listScore = (level,score) => api.post('',{level:level,score:score})
  const listScoreSave = (level,score,player) => api.post('',{level:level,score:score,player:player})
  const creatAadvertising = (name, type, category, cep, exchange_by, main_image, description, images) => api.post('advertising', {name:name, type:type, category:category, cep:cep, exchange_by:exchange_by, main_image:main_image, description:description, images:images})
  const listType = () => api.get('advertising/type')
  const listFeatured = () => api.get('advertising/featured')
  const listAdvertising = (group, category, type, area, lat, lng, q) => api.get(`advertising?group=${group}&category=${category}&type=${type}&area=${area}&lat=${lat}&lng=${lng}&q=${q}&limit=4`)
  const listAdvertisingLimit = (type, area, lat, lng, limit) => api.get(`advertising?type=${type}&area=${area}&lat=${lat}&lng=${lng}&limit=${limit}`)
  const listActives = () => api.get('user/advertising/active')
  const listInactives = () => api.get('user/advertising/inactive')
  const listFinished = () => api.get('user/advertising/finished')
  const editAdvertising = (id, name, type, category, cep, exchange_by, main_image, description, images, status) => api.put(`advertising/`+id, {name:name, type:type, category:category, cep:cep, exchange_by:exchange_by, main_image:main_image, description:description, images: images, status: status})
  const finishAdvertising = (id, name, reason) =>api.post(`advertising/`+id+`/finish`, {reason_to_finish:name, describe_reason_to_finish:reason})
  const editProfile = (name, surname, phone, image) =>api.put(`user/my_self`, {first_name:name, last_name:surname, phone:phone, image:image})
  const storeChat = (advertisement_id) => api.post('chat', {advertisement_id:advertisement_id})
//  const deleteChat = (user_id, advertisement_id, type) => api.post('chat', {user_id:user_id, advertisement_id:advertisement_id, type:type})
  const storeContactUs = (subject,message) => api.post('contactus', {subject:subject,message:message})
  const storeInvoice = (payment_id,advertising_id,days,value_per_day) => api.post('invoices', {payment_id:payment_id,advertising_id:advertising_id,days:days,value_per_day:value_per_day})
  const storePayment = (number,cvv,holder,month,year,description) => api.post('payment_methods', {number: number,verification_value: cvv,holder: holder,
    month: month,year: year,description: description,set_as_default:true,payer:{cpf_cnpj:"655.722.120-59",
		address:{
			zip_code:"",
			street:"",
			number:"",
			complement:null,
			district:"",
			city:"",
			state:""
		}}})
  const getChats = () => api.get('chat')
  const lastMessage = (chat_id, last_message) => api.put('chat/'+chat_id, {last_message:last_message})
  const readMessage = (chat_id) => api.put('chat/'+chat_id+'/read', {is_read:true})
  const deleteChat = (chat_id) => api.delete('chat/'+chat_id)
  const deleteHistory = (id) => api.delete('advertising/'+id)
  const listAdvertisingRandom = (area, lat, lng) => api.get(`random/advertising?area=${area}&lat=${lat}&lng=${lng}`)
  const listAdvertisingByCategory = (area, lat, lng, category) => api.get(`advertising?area=${area}&lat=${lat}&lng=${lng}&category=${category}`)
  const listAdvertisingByCategoryLimitOffet = (area, lat, lng, category, offset) => api.get(`advertising?area=${area}&lat=${lat}&lng=${lng}&category=${category}&offset=${offset}&limit=10`)
  const listAdvertisingByType = (type, area, lat, lng) => api.get(`advertising?type=${type}&area=${area}&lat=${lat}&lng=${lng}`)
  const listAdvertisingByTypeLimitOffet = (type, area, lat, lng, offset) => api.get(`advertising?type=${type}&area=${area}&lat=${lat}&lng=${lng}&offset=${offset}&limit=10`)
  const listAdvertisingByUser = (user_id) => api.get(`advertising?user=${user_id}`)
  const listAdvertisingMap = (texto, area, lat, lng) => api.get(`advertising?area=${area}&lat=${lat}&lng=${lng}&q=${texto}`)
  const listAdvertisingMapiOS = (texto, area, lat, lng) => api.get(`advertising?area=${area}&lat=${lat}&lng=${lng}&q=${texto}`)


  return {
    listCategories,
    listScore,
    listScoreSave,
    creatAadvertising,
    listAdvertising,
    listType,
    listFeatured,
    listActives,
    listInactives,
    listFinished,
    deleteHistory,
    editAdvertising,
    editProfile,
    finishAdvertising,
    storeChat,
    deleteChat,
    storePayment,
    storeInvoice,
    storeContactUs,
    getChats,
    lastMessage,
    readMessage,
    listAdvertisingRandom,
    listAdvertisingByCategory,
    listAdvertisingByCategoryLimitOffet,
    listAdvertisingByType,
    listAdvertisingByTypeLimitOffet,
    listAdvertisingByUser,
    listAdvertisingLimit,
    listAdvertisingMap,
    listAdvertisingMapiOS,
  }
}

export default {
  create
}
