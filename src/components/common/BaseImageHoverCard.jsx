import PropTypes from "prop-types";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

const MotionCard = motion.div;

const BaseImageHoverCard = ({
  imgSrc,
  title,
  description = "",
  badge,
  onClick,
  styleConfig = {},
}) => {
  // Desestructurando las configuraciones para mayor claridad
  const {
    overlayGradient = "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
    badgeBg = "bg-emerald-500 text-white",
    height = "300px",
  } = styleConfig;

  return (
    <MotionCard
      whileHover={{
        y: -10,
        scale: 1.05,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300",
        `h-[${height}]`
      )}
      role="group"
    >
      {/* Imagen */}
      <img
        src={imgSrc}
        alt={title || "Imagen del producto"}
        className="w-full h-48 object-cover brightness-[0.95] saturate-[1.05]"
      />

      {/* Gradiente superpuesto */}
      <div className={clsx("absolute inset-0 z-10", overlayGradient)} />

      {/* Badge */}
      {badge && (
        <div
          className={clsx(
            "absolute top-4 left-4 px-3 py-1 text-sm rounded-full z-20 font-medium",
            badgeBg
          )}
        >
          {badge}
        </div>
      )}

      {/* Título y descripción */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-black/60 text-white">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
          </Tooltip.Trigger>
          {description && (
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                align="center"
                className="bg-black text-white text-xs rounded-md px-3 py-2 shadow-xl max-w-xs z-50"
              >
                {description}
                <Tooltip.Arrow className="fill-black" />
              </Tooltip.Content>
            </Tooltip.Portal>
          )}
        </Tooltip.Root>

        {/* Solo mostrar el párrafo si la descripción está disponible */}
        {description && (
          <p className="text-sm opacity-85 line-clamp-2">{description}</p>
        )}
      </div>
    </MotionCard>
  );
};

BaseImageHoverCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  badge: PropTypes.string,
  onClick: PropTypes.func,
  styleConfig: PropTypes.shape({
    overlayGradient: PropTypes.string,
    badgeBg: PropTypes.string,
    height: PropTypes.string,
  }),
};

export default BaseImageHoverCard;
