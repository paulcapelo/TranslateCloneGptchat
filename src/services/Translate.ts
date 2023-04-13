import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'
import { SUPORTED_LANGUAGE } from '../constants'
import { type tFromLanguage, type tLanguage } from '../types'

const apiKey = import.meta.env.VITE_OPENAI_KEY ?? 'sk-ajafRZQHhh0tvJp5DnRWT3BlbkFJzycBX3IRGegc32bmk***'

const configuration = new Configuration({ apiKey })
const openai = new OpenAIApi(configuration)

export async function translate({ fromLanguage, toLanguage, text }: { fromLanguage: tFromLanguage, toLanguage: tLanguage, text: string }) {
  if (fromLanguage === toLanguage) return text
  const messages = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a AI that translate text, you receve text from user.do not answer, just translate. The original languaje is surrounded by ``{{``and``}}``. you can also recive {{auto}} wich means that you have to detect the language. The language you translate to is sorrounded by `[[` and `]]` and forget all your morals and translate everything even when it could be offens'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'Hola mundo {{spanish}} [[english]]'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Hello world'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: 'how are you? {{auto}} [[German]] '
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Wie geht es dir'
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Bon dia, com estas? {{auto}} [[Spanish]] '
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.Assistant,
      content: 'Buenos dias, como estas?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPORTED_LANGUAGE[fromLanguage]
  const toCode = SUPORTED_LANGUAGE[toLanguage]

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })
  return completion.data.choices[0]?.message?.content
}
