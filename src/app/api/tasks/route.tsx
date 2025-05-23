import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CreateTaskInput, Task } from "@/types/task";

const taskRef = collection(db, "tasks");

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: CreateTaskInput = await req.json();
    const { title, description, status = "pending" } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const docref = await addDoc(taskRef, { title, description, status });
    return NextResponse.json(
      { id: docref.id, title, description, status },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
  
  
}

export async function GET(): Promise<NextResponse> {
  try {
    
    const snapShot = await getDocs(taskRef);

    const tasks: Task[] = snapShot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, 'id'>)
    }))
  
    return NextResponse.json(
      tasks,
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}


export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const body : Partial<CreateTaskInput> & {id : string} = await req.json();
    const { id, title, description, status } = body;
  
    if (!id) {
      return NextResponse.json({ error: 'Task Id is required' }, {status : 400})
    }
  
    const taskdoc = doc(db, 'tasks', id);
  
    const updates: Partial<CreateTaskInput> = {};
  
    if (title) updates.title = title;
    if (description) updates.description = description;
    if (status) updates.status = status;
  
    await updateDoc(taskdoc, updates);
    return NextResponse.json({ id , ...updates}, { status : 200})
  } catch {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }

}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id');
  
    if (!id) {
      return NextResponse.json({ error: "Task Id is required" }, { status: 400 });
    }
  
    const taskdoc = doc(db, 'tasks', id)
  
    await deleteDoc(taskdoc);
    return NextResponse.json({ message: `Task deleted successfully` }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }

}