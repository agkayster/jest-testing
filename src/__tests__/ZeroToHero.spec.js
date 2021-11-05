import pizzas from '../data'; // pizzas i the name we have give to our data.json when importing it to our test script//

test('the pizza data is correct', () => {
	expect(pizzas).toMatchSnapshot(); // snapshot testing//
	expect(pizzas).toHaveLength(4); // check the length of the array//
	expect(pizzas.map((pizza) => pizza.name)).toEqual([
		'Chicago Pizza',
		'Neopolitan Pizza',
		'New york Pizza',
		'Obalende Pizza',
	]); // did a mapping over the array to get the pizza names//
});
test('the pizza length data is correct', () => {
	expect(pizzas).toHaveLength(4); // check the length of the array//
});

for (let i = 0; i < pizzas.length; i += 1) {
	test(`pizzas[${i}] should have properties(id, name, image, desc, price)`, () => {
		expect(pizzas[i]).toHaveProperty('id');
		expect(pizzas[i]).toHaveProperty('name');
		expect(pizzas[i]).toHaveProperty('image');
		expect(pizzas[i]).toHaveProperty('desc');
		expect(pizzas[i]).toHaveProperty('price');
	});
} // we did a loop to get the properties of each object in the array //

// Use mocking to run a basic mock test//

test('mock implementation of a basic function', () => {
	const mock = jest.fn(() => 'I am a mock function');
	console.log(mock);
});

//To test that const mock is equal to "I am a mock function"//
test('another mock implementation of a basic function', () => {
	const mock = jest.fn(() => 'I am a mock function');
	expect(mock('calling my mock function!')).toBe('I am a mock function');
	expect(mock).toHaveBeenCalledWith('calling my mock function!');
});

// Using mock return value to return once//

test('mock return value of a function one time', () => {
	const mock = jest.fn();

	mock.mockReturnValueOnce('Hello').mockReturnValueOnce('there!');
	mock();
	mock();
	expect(mock).toHaveBeenCalledTimes(2);

	mock('Hello', 'there', 'Steve!');
	expect(mock).toHaveBeenCalledWith('Hello', 'there', 'Steve!');

	mock('Steve');
	expect(mock).toHaveBeenLastCalledWith('Steve');
});

//Using mock to implement a function| mock implementation instead of returning a value//

test('mock implementation of a function', () => {
	const mock = jest.fn().mockImplementation(() => 'United Kingdom');
	expect(mock('location')).toBe('United Kingdom');
	expect(mock).toHaveBeenCalledWith('location');
});

// Using spying to get an importd module in a single function//

test('spying using the original implementation', () => {
	const pizza = {
		name: (n) => `Pizza name: ${n}`,
	};
	const spy = jest.spyOn(pizza, 'name');
	expect(pizza.name('Loaf')).toBe('Pizza name: Loaf');
	expect(spy).toBeCalledWith('Loaf');
});

// Using spy to change the implementation of a function//

test('spying using mockImplementation', () => {
	const pizza = {
		name: (n) => `Pizza name: ${n}`,
	};
	const spy = jest.spyOn(pizza, 'name');
	spy.mockImplementation((n) => 'Crazy pizza'); // this changes the name//

	expect(pizza.name('Cheese')).toBe('Crazy pizza');

	spy.mockRestore(); // This restores back the old name//
	expect(pizza.name('Cheese')).toBe('Pizza name: Cheese');
});

// Used a mock function to get the last returned value//
test('pizza returns new york last', () => {
	const pizza1 = pizzas[0];
	const pizza2 = pizzas[1];
	const pizza3 = pizzas[2];

	const pizza = jest.fn((currentPizza) => currentPizza.price); // you can change the properties you are checking for based on the properties defined in the object//

	pizza(pizza1);
	pizza(pizza2);
	pizza(pizza3);

	expect(pizza).toHaveNthReturnedWith(2, 5); // you pick the particular return call out of the above three you wan to focus on//
	expect(pizza).toHaveLastReturnedWith(7.5);
});

// Using Data matching and matchers using a fixture(an object) //

test('pizza data has new york pizza and matches an object', () => {
	const obalendePizza = {
		id: 4,
		name: 'Obalende Pizza',
		image: 'https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
		desc: 'Very unique and thoughtful taste',
		price: 3.5,
	};

	expect(pizzas[3]).toMatchObject(obalendePizza);
});

//Implementing asynchronous testing (RESOLVE)//

test('expect a promise to resolve', async () => {
	const user = {
		getFullName: jest.fn(() => Promise.resolve('Ejike Chiboka')),
	};

	await expect(user.getFullName('Ejike Chiboka')).resolves.toBe(
		'Ejike Chiboka'
	);
});

//Implementing asynchronous testing (REJECT)//

test('expect a promise to reject', async () => {
	const user = {
		getFullName: jest.fn(() =>
			Promise.reject(new Error('Something went terribly wrong.'))
		),
	};

	await expect(user.getFullName('Ejike Chiboka')).rejects.toThrow(
		'Something went terribly wrong.'
	);
});
