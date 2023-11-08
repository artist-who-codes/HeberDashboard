import supabase from "../supabase";

export async function fetchTasks(userId: string) {
  let { data: assignedByTasks, error: error1 } = await supabase
    .from("tasks")
    .select("*")
    .eq("assigner_id", userId);
  if (error1) {
    return { status: false, data: error1, message: "Data Fetch Unsuccessful" };
  }
  let { data: assignedToTasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("assignee_id", userId);
  if (error) {
    return { status: false, data: error, message: "Data Fetch Unsuccessful" };
  }
  let response = {
    assignedByTasks,
    assignedToTasks,
  };
  return { status: true, data: response, message: "Fetched Data Successfully" };
}

export async function createTask(
  assigner_id: string,
  assignee_id: string,
  task_title: string,
  task_description: string,
  task_due: Date,
  status_details: string,
  current_status: string
) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        assigner_id,
        assignee_id,
        task_title,
        task_description,
        task_due,
        status_details,
        current_status,
      },
    ])
    .select();

  if (error) {
    return { status: false, data: error, message: "Adding Task Unsuccessful" };
  }
  return {
    status: true,
    data,
    message: "Task created successfully",
  };
}

export async function fetchUsers(rolePower: number) {
  let { data: profiles, error } = await supabase.from("profiles").select("*").lt("role_power",rolePower);
  console.log(profiles, error)
  if (error) {
    return { status: false, data: error, message: "Data Fetch Unsuccessful" };
  }
  return {
    status: true,
    data: profiles,
    message: "Fetched Users Successfully",
  };
}

export async function updateTask(id: string, current_status: string) {
  const { data, error } = await supabase
    .from("tasks")
    .update({ current_status })
    .eq("id", id)
    .select();
  if (error) {
    return error;
  }
  return {
    status: true,
    data,
    message: "Status updated successfully",
  };
}
