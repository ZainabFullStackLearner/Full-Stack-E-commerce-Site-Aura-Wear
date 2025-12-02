// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { client as sanityClient } from '@/sanity/lib/client';


export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, price, category, description, stockQuantity, isActive } = body;

    // Update Sanity (content)
    await sanityClient
      .patch(params.id)
      .set({
        name,
        price,
        category,
        description,
        stockQuantity,
        isActive,
      })
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Delete from Sanity
    await sanityClient.delete(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
