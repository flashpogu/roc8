import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

// Initialize Prisma client
const prisma = new PrismaClient();

// Generate random product data
const generateRandomProduct = () => {
  return {
    product: faker.commerce.product(),
  };
};

// Create a new product in the database
const createProduct = async () => {
  try {
    const productData = generateRandomProduct();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const newProduct = await prisma.products.create({
      data: productData,
    });
    console.log("Product created:", newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
  } finally {
    await prisma.$disconnect();
  }
};

// Call the function to create a new product
for (let i = 0; i < 100; i++) {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  createProduct();
}
