import * as nlightnApi from '../apis/nlightn'
import { commonTasks } from '../components/commonQuestions'


export const aiResponse = async (raw_prompt:string)=>{
    
    let business_topics_set = new Set()
    commonTasks.map((item)=>{
        business_topics_set.add(item.name)
    })
    const business_topics = Array.from(business_topics_set)

    const finalPrompt = `Return the business topic from this list of business topics is this question most likely related to?: question: ${raw_prompt}; business topics: ${business_topics}.  If the prompt doesn't match exactly and itm in the list, return 'other_topic'`
    try{
        const response = await nlightnApi.askGPT(finalPrompt)

        if (response ==="other_topic"){
            const response2 = await nlightnApi.askGPT(raw_prompt)
            return [response2]
        }else{
            const result:any = await commonTasks.find(i=>i.name === response).action()
            return result
        }
    }catch(error){
        const result = {
            data:["I don'thave enough data to answer with confidence.  Is there something else I can help with?"]
        }
        return result
    }
    
}