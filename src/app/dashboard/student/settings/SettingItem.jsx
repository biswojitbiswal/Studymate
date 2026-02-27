export default function SettingItem({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition cursor-pointer">
      <div className="flex items-center gap-2">

        {/* render icon only if provided */}
        {Icon && (
          <div className="text-blue-600">
            <Icon size={20} />
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-800">{title}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>

      </div>

      {action}
    </div>
  );
}