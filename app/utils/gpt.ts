import * as nlightnApi from '../apis/nlightn'

export const preSscreen = async (raw_prompt:string)=>{
    const finalPrompt = `Is the following text a question or statement?: ${raw_prompt}.  Only respond with either the word 'question' or 'statement'.`
    const statementType = await nlightnApi.askGPT(finalPrompt)
    console.log(statementType)
    if (statementType.toLowerCase() ==="statement"){
        return "Ok, noted.  Do you have an ask fo rme"
    }else{
        return "Hold on.  Let me check..."
    }
}