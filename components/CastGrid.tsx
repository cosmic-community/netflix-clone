import { CastMember } from '@/types'

interface CastGridProps {
  cast: CastMember[]
}

export default function CastGrid({ cast }: CastGridProps) {
  if (cast.length === 0) {
    return (
      <p className="text-gray-400">No cast information available</p>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {cast.map((member) => (
        <div key={member.id} className="text-center">
          {member.metadata?.profile_photo?.imgix_url ? (
            <img
              src={`${member.metadata.profile_photo.imgix_url}?w=200&h=300&fit=crop&auto=format,compress`}
              alt={member.metadata?.name || member.title}
              className="w-full h-48 object-cover rounded-lg mb-3"
              width={200}
              height={300}
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Photo</span>
            </div>
          )}
          
          <h3 className="text-white font-medium text-sm mb-1">
            {member.metadata?.name || member.title}
          </h3>
          
          {member.metadata?.role_type?.value && (
            <p className="text-gray-400 text-xs">
              {member.metadata.role_type.value}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}