import configPromise from '@payload-config'
import { BasePayload, getPayload } from 'payload'

export const getPayloadData = async (fn: Function) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const res = await fn(payload)
  return res;
}

export const getQuizesList =  () => 
   getPayloadData(async (payload: BasePayload) => {
    const quizes = await payload.find({
      collection: 'quizzes',
    })

    return quizes
  })
