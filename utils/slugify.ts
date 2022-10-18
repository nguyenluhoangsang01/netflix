const slugify = (string?: string) =>
  string
    ?.toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

export default slugify;
