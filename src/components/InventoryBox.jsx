export default function InventoryBox({ title, amount, img }) {
  return (
    <div className="flex flex-col justify-center gap-4">
      <img src={img} alt={title} className="mx-auto h-16 w-16" />
      <div className="flex flex-col-reverse gap-2 text-center">
        <h4 className="text-sm text-text-primary dark:text-text-header-dark">
          {title}
        </h4>
        <p className="font-bold text-text-highlight dark:text-text-highlight-dark">
          {amount}
        </p>
      </div>
    </div>
  );
}
