export default async function (payload: unknown = undefined) {
  const res = await fetch('https://dt-url.net/ec2prices');
  let result = await res.json();
  
  return result;
}

