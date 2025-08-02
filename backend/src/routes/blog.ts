import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput } from "@tushar0203/usable";
import { Hono } from "hono";
import { verify } from "hono/jwt";

const basePrisma = new PrismaClient();
const prisma = basePrisma.$extends(withAccelerate())

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
	Variables: {
		userId: string;
		prisma: typeof prisma
	}
}>();

blogRouter.use(async (c, next) => {
	let bearer_token = c.req.header('authorization')
	console.log(bearer_token)
	if (!bearer_token) {
		console.log("ASas")
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	let token = bearer_token?.split(" ")[1];
	const decodedPayload = await verify(token, c.env.JWT_SECRET)
	c.set('userId', decodedPayload.id as string)
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	c.set('prisma', prisma)
	await next()
})

blogRouter.post('/', async (c) => {
	const body = await c.req.json();
	console.log(body)
	console.log(createPostInput)
	const { success } = createPostInput.safeParse(body)
	console.log(typeof createPostInput)
	console.log(success)
	if (!success) {
		c.status(401);
		return c.json({ error: "Invalid Payload" });
	}
	const userId = c.get('userId');
	const prisma = c.get('prisma')


	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})

blogRouter.put('/:id', async (c) => {
	const { success } = createPostInput.safeParse(c.req.json())
	if (!success) {
		c.status(401);
		return c.json({ error: "Invalid Payload" });
	}
	const postId = c.req.param('id');
	const userId = c.get('userId')
	console.log(postId)
	console.log(userId)
	const prisma = c.get('prisma')
	const body = await c.req.json();
	await prisma.post.update({
		where: {
			id: postId,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
});

blogRouter.get('/bulk', async (c) => {
	const prisma = c.get('prisma')
	const posts = await prisma.post.findMany({
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
	});

	return c.json(posts);
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = c.get('prisma')

	const post = await prisma.post.findUnique({
		where: {
			id
		},
		include: {
			author: {
				select: {
					name: true,
				},
			},
		},
	});

	return c.json(post);
})
