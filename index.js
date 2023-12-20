import dotenv from 'dotenv'
import { Markup, Telegraf } from 'telegraf'

dotenv.config()
const bot = new Telegraf(process.env.BOT_TOKEN) //токен бота писать в env.env

bot.start(ctx => {
	ctx.reply(`
Привет, ${ctx.message.from.first_name}!
Это курсы от самого Yah'yaeva Victora!
`)
	ctx.reply(`
Какие курсы тебя интерисуют?
`)
	ctx.reply(
		`
Если у вас пропали команды напишите команду перезапуск или /start
`,
		Markup.keyboard([
			['🐍 Python'],
			['📱 Smm'],
			['🖼 Photoshop'],
			['🤎ShitCleaner'],
		])
			.oneTime()
			.resize()
	)
})

async function Course(courseName, file, ctx) {
	try {
		await ctx.reply(`Курсы по ${courseName}`)
		const waitMessage = await ctx.reply('Подождите...')
		try {
			await ctx.replyWithDocument({
				source: `./documents/${file}`,
			})
		} catch (error) {
			console.error(`Ошибка с файлом: ${error}`)
			ctx.reply('К сожалению данный курс пока в разработке😇')
		}
		await ctx.deleteMessage(waitMessage.message_id)
		setTimeout(() => ctx.reply('Что-то еще?'), 1000)
	} catch (e) {
		console.error(`Ошибка: ${e}`)
	}
}

bot.hears('🐍 Python', ctx => Course('🐍 Python', 'python.pdf', ctx))
bot.hears('📱 Smm', ctx => Course('📱 Smm', 'smm.pdf', ctx))
bot.hears('🖼 Photoshop', ctx => Course('🖼 Photoshop', '', ctx))
bot.hears('🤎ShitCleaner', ctx =>
	Course('🤎ShitCleaner', 'chist.html.pdf', ctx)
)

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
