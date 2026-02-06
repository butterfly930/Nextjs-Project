type Author = {
    id: number;
    name: string;
}

export async function Author ({ userId }: { userId: number }) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const author: Author = await response.json();

    return (
        <div>
            <span>
                
            </span>
        </div>
    );
}