import { todos } from '@/src/data';
import { NextResponse } from 'next/server';

export let localTodos = [...todos];

export const GET = () => NextResponse.json(localTodos, { status: 200 });

export const POST = async req => {
	try {
		const todo = await req.json();
		localTodos.push(todo);
		return NextResponse.json(todo, { status: 201 });
	} catch (error) {
		console.error('Error adding todo:', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const DELETE = async req => {
	const { id } = await req.json();
	try {
		localTodos = localTodos.filter(todo => todo.id !== id);
		return NextResponse.json(localTodos, { status: 200 });
	} catch (error) {
		console.error(`Error deleting todo with id=${id}:`, error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const PATCH = async req => {
	const { id } = await req.json();
	try {
		let todoIndex = localTodos.findIndex(todo => todo.id === id);
		localTodos[todoIndex].completed = !localTodos[todoIndex].completed;
		return NextResponse.json(localTodos, { status: 200 });
	} catch (error) {
		console.error(`Error updating todo with id: ${id}:`, error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

export const PUT = async req => {
	try {
		localTodos = localTodos.filter(todo => !todo.completed);
		return NextResponse.json(localTodos, { status: 200 });
	} catch (error) {
		console.log('Error clearing completed todos', error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};
